import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  website?: string;
  consent?: boolean;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const name = body.name?.trim() ?? "";
    const company = body.company?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const phone = body.phone?.trim() ?? "";
    const interest = body.interest?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const website = body.website?.trim() ?? "";
    const consent = body.consent === true;

    // Honeypot anti-spam: bots costumam preencher este campo invisível.
    if (website) {
      return NextResponse.json({ message: "Contato recebido." }, { status: 200 });
    }

    if (!name || !email || !interest || !consent) {
      return NextResponse.json(
        { message: "Preencha os campos obrigatórios." },
        { status: 400 },
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Informe um e-mail válido." },
        { status: 400 },
      );
    }

    if (
      name.length > 100 ||
      company.length > 120 ||
      email.length > 160 ||
      phone.length > 30 ||
      interest.length > 100 ||
      message.length > 1500
    ) {
      return NextResponse.json(
        { message: "Um ou mais campos excedem o tamanho permitido." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const contactToEmail =
      process.env.CONTACT_TO_EMAIL || "contato@bravsystems.com.br";
    const contactFromEmail =
      process.env.CONTACT_FROM_EMAIL || "BravSystems <site@bravsystems.com.br>";

    if (!resendApiKey) {
      console.error("RESEND_API_KEY não configurada.");
      return NextResponse.json(
        {
          message:
            "O formulário ainda não está conectado ao serviço de e-mail. Tente novamente mais tarde.",
        },
        { status: 503 },
      );
    }

    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company || "Não informado"),
      email: escapeHtml(email),
      phone: escapeHtml(phone || "Não informado"),
      interest: escapeHtml(interest),
      message: escapeHtml(message || "Não informado"),
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `Novo contato BravSystems — ${interest}`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
            <h2 style="color:#0b2947;">Novo contato pelo site BravSystems</h2>
            <p><strong>Nome:</strong> ${safe.name}</p>
            <p><strong>Empresa:</strong> ${safe.company}</p>
            <p><strong>E-mail:</strong> ${safe.email}</p>
            <p><strong>Telefone / WhatsApp:</strong> ${safe.phone}</p>
            <p><strong>Interesse:</strong> ${safe.interest}</p>
            <p><strong>Mensagem:</strong><br>${safe.message.replaceAll("\n", "<br>")}</p>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
            <p style="font-size:12px;color:#64748b;">
              Origem: formulário comercial de bravsystems.com.br
            </p>
          </div>
        `,
        text: [
          "Novo contato pelo site BravSystems",
          `Nome: ${name}`,
          `Empresa: ${company || "Não informado"}`,
          `E-mail: ${email}`,
          `Telefone / WhatsApp: ${phone || "Não informado"}`,
          `Interesse: ${interest}`,
          `Mensagem: ${message || "Não informado"}`,
        ].join("\n"),
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error("Erro Resend:", errorBody);

      return NextResponse.json(
        {
          message:
            "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      {
        message:
          "Recebemos seu contato. A BravSystems retornará o mais breve possível.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro no formulário de contato:", error);

    return NextResponse.json(
      {
        message:
          "Não foi possível processar sua solicitação. Tente novamente.",
      },
      { status: 500 },
    );
  }
}