"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/products";

type LeadFormProps = { defaultInterest?: string };

export function LeadForm({ defaultInterest = "" }: LeadFormProps) {
  const [interest, setInterest] = useState(defaultInterest);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (defaultInterest) return;
    const selected = new URLSearchParams(window.location.search).get("interest");
    if (selected) setInterest(selected);
  }, [defaultInterest]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      interest: String(data.get("interest") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
      consent: data.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar o contato.");
      form.reset();
      setInterest(defaultInterest);
      setStatus("success");
      setMessage("Recebemos seu contato. A BravSystems retornará o mais breve possível.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Não foi possível enviar. Tente novamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-[#cbddea] bg-white p-6 shadow-xl shadow-[#0b2947]/10 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome *"><input name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Seu nome" /></Field>
        <Field label="Empresa"><input name="company" maxLength={120} autoComplete="organization" className="field" placeholder="Nome da empresa" /></Field>
        <Field label="E-mail *"><input type="email" name="email" required maxLength={160} autoComplete="email" className="field" placeholder="voce@empresa.com.br" /></Field>
        <Field label="Telefone / WhatsApp"><input name="phone" maxLength={30} autoComplete="tel" className="field" placeholder="(11) 99999-9999" /></Field>
      </div>

      <label className="mt-5 block text-sm font-bold text-[#334155]">
        Solução de interesse *
        <select name="interest" required value={interest} onChange={(e) => setInterest(e.target.value)} className="field mt-2">
          <option value="" disabled>Selecione uma opção</option>
          {products.map((product) => <option key={product.name} value={product.name}>{product.name} — {product.category}</option>)}
          <option value="Serviços administrativos">Serviços administrativos</option>
          <option value="Parceria">Parceria comercial</option>
          <option value="Outro">Outro assunto</option>
        </select>
      </label>

      <label className="mt-5 block text-sm font-bold text-[#334155]">
        Como podemos ajudar?
        <textarea name="message" maxLength={1500} rows={5} className="field mt-2 min-h-32 py-3" placeholder="Conte brevemente o cenário e a principal dificuldade da sua empresa." />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className="mt-5 flex items-start gap-3 text-[13px] leading-6 text-[#64748b]">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 accent-[#154b7a]" />
        <span>Autorizo a BravSystems a utilizar os dados informados para responder esta solicitação. Consulte nossa <Link href="/politica-de-privacidade" className="font-bold text-[#154b7a] underline">Política de Privacidade</Link>.</span>
      </label>

      <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#154b7a] px-6 text-[15px] font-bold text-white shadow-lg transition hover:bg-[#0b2947] disabled:cursor-not-allowed disabled:opacity-60">
        {status === "sending" ? "Enviando..." : status === "error" ? "Tentar novamente" : "Falar com a BravSystems"}
      </button>

      {message && <div role="status" aria-live="polite" className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${status === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{message}</div>}
      <p className="mt-4 text-center text-xs leading-5 text-[#94a3b8]">Seus dados são usados para atendimento da solicitação e não são publicados no site.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="text-sm font-bold text-[#334155]">{label}{children}</label>;
}
