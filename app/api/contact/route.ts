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

    const welcomeResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [email],
        subject: "Obrigado pelo contato | BravSystems",
        html: `
          <div style="margin:0;padding:32px 16px;background:#eaf3fb;font-family:Arial,sans-serif;color:#334155;line-height:1.7;">
            <div style="max-width:620px;margin:0 auto;overflow:hidden;border:1px solid #d7e3ec;border-radius:20px;background:#ffffff;">
              <div style="padding:24px 32px;background:#0b2947;color:#ffffff;">
                <div style="font-size:20px;font-weight:700;">BravSystems</div>
                <div style="margin-top:4px;font-size:13px;color:#b8cee0;">Tecnologia e Gestão</div>
              </div>
              <div style="padding:32px;">
                <p style="margin:0 0 20px;color:#0f172a;font-size:17px;">Olá, ${safe.name}.</p>
                <p style="margin:0 0 18px;">Obrigado por entrar em contato com a BravSystems.</p>
                <p style="margin:0 0 18px;">Recebi sua mensagem e fico muito feliz pelo seu interesse em conhecer melhor o nosso trabalho.</p>
                <p style="margin:0 0 18px;">A BravSystems nasceu da experiência prática com gestão e da vontade de transformar problemas reais das empresas em soluções mais simples, organizadas e eficientes.</p>
                <p style="margin:0 0 18px;">Hoje desenvolvemos soluções para diferentes áreas da gestão, com BravOs, BravHas e BravHos, além dos nossos serviços de gestão.</p>
                <p style="margin:0 0 18px;">Vou analisar as informações que você compartilhou para entendermos como a BravSystems pode contribuir com a sua empresa.</p>
                <p style="margin:0 0 26px;">Em breve continuamos essa conversa.</p>
                <p style="margin:0 0 24px;">Um abraço,</p>
                <div style="border-top:1px solid #e2e8f0;padding-top:20px;">
                  <div style="font-size:16px;font-weight:700;color:#0b2947;">Robson Fernandes</div>
                  <div style="margin-top:2px;font-size:13px;color:#64748b;">Fundador e CEO</div>
                  <div style="margin-top:2px;font-size:13px;font-weight:700;color:#154b7a;">BravSystems • Tecnologia e Gestão</div>
                </div>
              </div>
            </div>
          </div>
        `,
        text: [
          `Olá, ${name}.`,
          "",
          "Obrigado por entrar em contato com a BravSystems.",
          "",
          "Recebi sua mensagem e fico muito feliz pelo seu interesse em conhecer melhor o nosso trabalho.",
          "",
          "A BravSystems nasceu da experiência prática com gestão e da vontade de transformar problemas reais das empresas em soluções mais simples, organizadas e eficientes.",
          "",
          "Hoje desenvolvemos soluções para diferentes áreas da gestão, com BravOs, BravHas e BravHos, além dos nossos serviços de gestão.",
          "",
          "Vou analisar as informações que você compartilhou para entendermos como a BravSystems pode contribuir com a sua empresa.",
          "",
          "Em breve continuamos essa conversa.",
          "",
          "Um abraço,",
          "",
          "Robson Fernandes",
          "Fundador e CEO",
          "BravSystems • Tecnologia e Gestão",
        ].join("\n"),
      }),
    });

    if (!welcomeResponse.ok) {
      const welcomeErrorBody = await welcomeResponse.text();
      console.error("Erro Resend no e-mail de boas-vindas:", welcomeErrorBody);
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