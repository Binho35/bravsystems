#!/usr/bin/env python3
import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE_URL = "https://developers.hostinger.com"
DEFAULT_CONFIG = "infra/dns/bravsystems.managed.json"


def request(method, path, token, payload=None):
    url = BASE_URL + path
    data = None
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
        "User-Agent": "BravSystems-DNS-Automation/1.0 (+https://github.com/Binho35/bravsystems)",
    }
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode("utf-8")
            return resp.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Hostinger API {method} {path} failed: HTTP {exc.code}: {body[:1000]}") from exc


def normalize_content(value):
    return str(value).strip().rstrip(".")


def record_key(item):
    return (str(item.get("name", "")).lower(), str(item.get("type", "")).upper())


def main():
    parser = argparse.ArgumentParser(description="Synchronize the BravSystems managed DNS records in Hostinger.")
    parser.add_argument("--config", default=DEFAULT_CONFIG)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    token = os.environ.get("HOSTINGER_API_TOKEN", "").strip()
    if not token:
        print("ERROR: HOSTINGER_API_TOKEN is not configured.", file=sys.stderr)
        return 2

    cfg = json.loads(Path(args.config).read_text(encoding="utf-8"))
    domain = cfg["domain"].strip()
    desired = cfg.get("managed_records", [])
    if not desired:
        print("No managed DNS records configured.")
        return 0

    print(f"Reading current DNS zone for {domain}...")
    _, current = request("GET", f"/api/dns/v1/zones/{domain}", token)
    current = current or []

    current_by_key = {record_key(item): item for item in current}
    changes = []

    for item in desired:
        key = record_key(item)
        name, rtype = key

        # Safety: never overwrite another DNS type on the same hostname.
        conflicts = [r for r in current if str(r.get("name", "")).lower() == name and str(r.get("type", "")).upper() != rtype]
        if conflicts:
            conflict_types = sorted({str(r.get("type", "")).upper() for r in conflicts})
            raise RuntimeError(
                f"Safety stop: hostname '{name}' already has conflicting record type(s): {', '.join(conflict_types)}"
            )

        existing = current_by_key.get(key)
        desired_contents = sorted(normalize_content(r["content"]) for r in item.get("records", []))
        existing_contents = sorted(
            normalize_content(r.get("content", ""))
            for r in (existing or {}).get("records", [])
            if not r.get("is_disabled", False)
        )
        desired_ttl = int(item.get("ttl", 14400))
        existing_ttl = int((existing or {}).get("ttl", -1))

        if existing_contents == desired_contents and existing_ttl == desired_ttl:
            print(f"OK: {name} {rtype} already matches desired state.")
        else:
            changes.append(item)
            print(
                f"CHANGE: {name} {rtype} -> {', '.join(desired_contents)} "
                f"(ttl={desired_ttl}; current={existing_contents or ['<missing>']}, ttl={existing_ttl})"
            )

    if not changes:
        print("DNS is already synchronized. Nothing to change.")
        return 0

    if args.dry_run:
        print(f"Dry-run: {len(changes)} managed record(s) would be updated.")
        return 0

    payload = {
        "overwrite": True,
        "zone": [
            {
                "name": item["name"],
                "type": item["type"],
                "ttl": int(item.get("ttl", 14400)),
                "records": [{"content": rec["content"]} for rec in item["records"]],
            }
            for item in changes
        ],
    }

    print("Validating managed DNS update with Hostinger...")
    request("POST", f"/api/dns/v1/zones/{domain}/validate", token, payload)

    print(f"Applying {len(changes)} managed DNS record(s)...")
    request("PUT", f"/api/dns/v1/zones/{domain}", token, payload)

    # Confirm API state without relying on public DNS propagation.
    for attempt in range(1, 7):
        time.sleep(5)
        _, updated = request("GET", f"/api/dns/v1/zones/{domain}", token)
        updated_by_key = {record_key(item): item for item in (updated or [])}
        pending = []
        for item in changes:
            key = record_key(item)
            actual = updated_by_key.get(key)
            actual_contents = sorted(
                normalize_content(r.get("content", ""))
                for r in (actual or {}).get("records", [])
                if not r.get("is_disabled", False)
            )
            desired_contents = sorted(normalize_content(r["content"]) for r in item["records"])
            if actual_contents != desired_contents or int((actual or {}).get("ttl", -1)) != int(item.get("ttl", 14400)):
                pending.append(item["name"])
        if not pending:
            print("Hostinger DNS API confirms the managed records are synchronized.")
            return 0
        print(f"Waiting for Hostinger API state ({attempt}/6): {', '.join(pending)}")

    raise RuntimeError("Hostinger accepted the update, but the API did not confirm the final state within 30 seconds.")


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        raise SystemExit(1)
