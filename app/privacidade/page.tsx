import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do site institucional da BravSystems e do formulário de contato comercial.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f4f8fb] px-6 py-12 text-[#334155] sm:py-16">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-[#dce6ed] bg-white p-6 shadow-sm sm:p-10 lg:p-12">
        <Link href="/" className="text-sm font-bold text-[#154b7a] underline-offset-4 hover:underline">← Voltar para a BravSystems</Link>
        <header className="mt-8 border-b border-[#e2e8f0] pb-8"><div className="text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]">BravSystems</div><h1 className="mt-3 text-4xl font-bold tracking-[-.04em] text-[#0b2947] sm:text-5xl">Política de Privacidade</h1><p className="mt-5 text-base leading-7 text-[#64748b]">Esta política explica como os dados enviados pelo site institucional da BravSystems são utilizados no atendimento de solicitações comerciais e de contato.</p></header>
        <div className="mt-8 space-y-8 text-[15px] leading-7">
          <Section title="1. Dados coletados">O formulário pode coletar nome, empresa, e-mail, telefone ou WhatsApp, solução ou assunto de interesse, mensagem e a confirmação de consentimento para contato. Campos opcionais são identificados no próprio formulário.</Section>
          <Section title="2. Finalidade">Os dados são utilizados para receber a solicitação, compreender o interesse informado, responder ao contato e conduzir a conversa comercial relacionada ao pedido enviado.</Section>
          <Section title="3. Processamento necessário">Para operacionalizar o formulário, a BravSystems utiliza serviços técnicos necessários ao funcionamento do site e ao envio de mensagens. Esses fornecedores podem processar dados na medida necessária à hospedagem, segurança e entrega de e-mail.</Section>
          <Section title="4. Compartilhamento">A BravSystems não publica os dados enviados pelo formulário e não os utiliza, por meio deste formulário, para venda a terceiros. O compartilhamento pode ocorrer com fornecedores técnicos necessários ao serviço.</Section>
          <Section title="5. Retenção e segurança">Os dados devem ser mantidos pelo período necessário ao atendimento, continuidade da relação comercial, cumprimento de obrigações aplicáveis e proteção de direitos. São adotadas medidas técnicas razoáveis sem afirmar segurança absoluta.</Section>
          <Section title="6. Direitos do titular">O titular pode solicitar informações, correção, atualização, eliminação quando aplicável, oposição ou esclarecimentos sobre o uso de seus dados, observados os limites previstos na legislação brasileira.</Section>
          <Section title="7. Cookies e mensuração">No estado atual, não declaramos ferramentas de publicidade, remarketing ou rastreamento comportamental não comprovadas. Caso analytics ou cookies não essenciais sejam adotados, esta política e os mecanismos de transparência ou consentimento deverão ser revistos.</Section>
          <section><h2 className="text-xl font-bold text-[#0b2947]">8. Contato</h2><p className="mt-3">Solicitações sobre privacidade podem ser encaminhadas para <a href="mailto:contato@bravsystems.com.br" className="font-bold text-[#154b7a] underline">contato@bravsystems.com.br</a>.</p></section>
          <section className="rounded-2xl border border-[#dce6ed] bg-[#f8fbfd] p-5"><h2 className="text-lg font-bold text-[#0b2947]">Revisão jurídica</h2><p className="mt-2 text-sm text-[#64748b]">Este texto reflete o funcionamento técnico auditado do site. Antes de ser tratado como instrumento jurídico definitivo, recomenda-se revisão por profissional jurídico responsável pela BravSystems.</p></section>
        </div>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section><h2 className="text-xl font-bold text-[#0b2947]">{title}</h2><p className="mt-3">{children}</p></section>; }
