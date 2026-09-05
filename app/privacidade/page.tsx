import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do site institucional da BravSystems e do formulário de contato comercial.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f8fb] px-6 py-12 text-[#334155] sm:py-16">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-[#dce6ed] bg-white p-6 shadow-sm sm:p-10 lg:p-12">
        <Link
          href="/"
          className="text-sm font-bold text-[#154b7a] underline-offset-4 hover:underline"
        >
          ← Voltar para a BravSystems
        </Link>

        <header className="mt-8 border-b border-[#e2e8f0] pb-8">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563eb]">
            BravSystems
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-[#0b2947] sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-base leading-7 text-[#64748b]">
            Esta política explica, de forma objetiva, como os dados enviados pelo
            site institucional da BravSystems são utilizados no atendimento de
            solicitações comerciais e de contato.
          </p>
        </header>

        <div className="mt-8 space-y-8 text-[15px] leading-7">
          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">1. Dados coletados</h2>
            <p className="mt-3">
              O formulário pode coletar nome, empresa, e-mail, telefone ou
              WhatsApp, produto ou assunto de interesse, mensagem e a confirmação
              de consentimento para contato. O campo de empresa, telefone e a
              mensagem podem ser opcionais conforme indicado no formulário.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">2. Finalidade</h2>
            <p className="mt-3">
              Os dados são utilizados para receber a solicitação, compreender o
              interesse informado, responder ao contato e conduzir a conversa
              comercial relacionada ao pedido enviado pelo titular.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">3. Processamento necessário</h2>
            <p className="mt-3">
              Para operacionalizar o formulário, a BravSystems utiliza serviços
              técnicos necessários ao funcionamento do site e ao envio de
              mensagens. Esses fornecedores podem processar os dados estritamente
              para executar os serviços contratados, como hospedagem e entrega de
              e-mail.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">4. Compartilhamento</h2>
            <p className="mt-3">
              A BravSystems não publica os dados enviados pelo formulário e não os
              utiliza, por meio deste formulário, para venda a terceiros. O
              compartilhamento pode ocorrer com fornecedores técnicos necessários
              para hospedagem, segurança e envio das comunicações solicitadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">5. Retenção e segurança</h2>
            <p className="mt-3">
              Os dados devem ser mantidos apenas pelo período necessário ao
              atendimento, continuidade da relação comercial, cumprimento de
              obrigações aplicáveis e proteção de direitos. A BravSystems adota
              medidas técnicas razoáveis para reduzir acesso indevido e exposição
              de informações, sem afirmar a existência de segurança absoluta.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">6. Direitos do titular</h2>
            <p className="mt-3">
              O titular pode solicitar informações, correção, atualização,
              eliminação quando aplicável, oposição ou esclarecimentos sobre o uso
              de seus dados, observados os limites e hipóteses previstos na
              legislação brasileira de proteção de dados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">7. Cookies e mensuração</h2>
            <p className="mt-3">
              No estado atual deste ciclo, esta política não declara uso de
              ferramentas de publicidade, remarketing ou rastreamento comportamental
              que não tenham sido comprovadas no site. Caso novas ferramentas de
              analytics ou cookies não essenciais sejam adotadas, esta política e
              os mecanismos de transparência ou consentimento deverão ser revistos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#0b2947]">8. Contato</h2>
            <p className="mt-3">
              Solicitações relacionadas a privacidade e dados pessoais podem ser
              encaminhadas para{" "}
              <a
                href="mailto:contato@bravsystems.com.br"
                className="font-bold text-[#154b7a] underline underline-offset-4"
              >
                contato@bravsystems.com.br
              </a>
              .
            </p>
          </section>

          <section className="rounded-2xl border border-[#dce6ed] bg-[#f8fbfd] p-5">
            <h2 className="text-lg font-bold text-[#0b2947]">Revisão jurídica</h2>
            <p className="mt-2 text-sm text-[#64748b]">
              Este texto foi estruturado para refletir o funcionamento técnico
              atualmente auditado do site. Antes de ser tratado como instrumento
              jurídico definitivo, recomenda-se revisão por profissional jurídico
              responsável pela BravSystems.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
