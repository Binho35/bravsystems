import part1 from "@/lib/hero-composition-002/part1";
import part2 from "@/lib/hero-composition-002/part2";
import part3 from "@/lib/hero-composition-002/part3";
import part4 from "@/lib/hero-composition-002/part4";
import part5 from "@/lib/hero-composition-002/part5";
import part6 from "@/lib/hero-composition-002/part6";
import part7 from "@/lib/hero-composition-002/part7";

const heroBytes = Buffer.from(
  [part1, part2, part3, part4, part5, part6, part7].join(""),
  "base64",
);

export const dynamic = "force-static";

export function GET() {
  return new Response(heroBytes, {
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(heroBytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
