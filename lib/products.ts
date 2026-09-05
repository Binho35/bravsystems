export type Product = {
  slug: string;
  name: string;
  category: string;
  status: "Disponível" | "Em evolução" | "Em homologação";
  headline: string;
  description: string;
  pain: string[];
  benefits: string[];
  capabilities: string[];
  audience: string[];
  limitations: string[];
  cta: string;
};

export const products: Product[] = [
  {
    slug: "bravos",
    name: "BravOS",
    category: "Operação e gestão para restaurantes",
    status: "Em evolução",
    headline: "Menos controles paralelos. Mais visão da operação do restaurante.",
    description: "O BravOS organiza frentes operacionais de restaurantes em um ambiente único para reduzir retrabalho, aumentar rastreabilidade e apoiar decisões.",
    pain: ["PDV, estoque e fichas técnicas desconectados", "Compras e produção com controles paralelos", "Dificuldade para enxergar margem e operação", "Dependência excessiva de planilhas"],
    benefits: ["Visão centralizada", "Mais rastreabilidade", "Menos retrabalho", "Apoio à decisão operacional"],
    capabilities: ["PDV e vendas", "Produtos e categorias", "Estoque e fichas técnicas", "Compras e recebimento", "Produção e cozinha", "Usuários e permissões", "Recursos de continuidade e sincronização"],
    audience: ["Restaurantes", "Operações de alimentação", "Negócios com múltiplos controles operacionais"],
    limitations: ["A experiência offline integral ainda não está homologada para todos os cenários", "Algumas integrações e módulos seguem evolução técnica"],
    cta: "Quero conhecer o BravOS",
  },
  {
    slug: "bravhas",
    name: "BravHAS",
    category: "Gestão administrativa e financeira",
    status: "Em evolução",
    headline: "Organize o financeiro e a administração sem depender de controles dispersos.",
    description: "O BravHAS centraliza rotinas administrativas e financeiras para ampliar previsibilidade, controle e acompanhamento de pendências.",
    pain: ["Contas espalhadas", "Vencimentos esquecidos", "Fluxo de caixa pouco confiável", "Documentos e obrigações descentralizados"],
    benefits: ["Centralização", "Previsibilidade", "Controle de pendências", "Melhor visão financeira"],
    capabilities: ["Contas a pagar", "Contas a receber", "Fluxo de caixa", "Obrigações", "Agenda", "Documentos", "Indicadores e controles administrativos"],
    audience: ["Pequenas e médias empresas", "Áreas administrativas", "Empresas que ainda dependem de Excel e controles paralelos"],
    limitations: ["O escopo comercial deve permanecer separado de RH e DP, que pertencem ao BravHOS"],
    cta: "Quero conhecer o BravHAS",
  },
  {
    slug: "bravhos",
    name: "BravHOS",
    category: "RH, DP e gestão de pessoas",
    status: "Em evolução",
    headline: "Centralize a jornada do colaborador com mais governança e rastreabilidade.",
    description: "O BravHOS organiza informações e rotinas de pessoas, RH e Departamento Pessoal para reduzir fragmentação e melhorar o histórico funcional.",
    pain: ["Documentos de colaboradores espalhados", "Admissões e rotinas manuais", "Pouca rastreabilidade de ponto, férias e afastamentos", "Histórico funcional fragmentado"],
    benefits: ["Histórico centralizado", "Governança", "Redução de retrabalho", "Rastreabilidade de RH"],
    capabilities: ["Pessoas e admissões", "Ponto e jornada", "Férias e afastamentos", "Benefícios", "Documentos", "Canais de RH", "Verticais de desenvolvimento conforme maturidade"],
    audience: ["Empresas com equipes internas", "RH e Departamento Pessoal", "Empresas que precisam organizar documentação e jornada do colaborador"],
    limitations: ["Novas verticais só devem ser comunicadas conforme homologação técnica"],
    cta: "Quero conhecer o BravHOS",
  },
  {
    slug: "bravmsg",
    name: "BravMsg",
    category: "Comunicação, campanhas e relacionamento",
    status: "Em evolução",
    headline: "Organize contatos, campanhas e atendimento em uma operação mais rastreável.",
    description: "O BravMsg estrutura relacionamento, contatos e comunicação para reduzir dispersão e dar mais controle à operação comercial e de atendimento.",
    pain: ["Mensagens e contatos espalhados", "Atendimento descentralizado", "Campanhas sem histórico claro", "Dificuldade de acompanhar consentimentos e opt-out"],
    benefits: ["Organização de contatos", "Histórico", "Governança de consentimento", "Mais visibilidade da comunicação"],
    capabilities: ["Contatos", "Campanhas", "Inbox", "Consentimentos", "Opt-out e suppression", "CRM", "Analytics", "Equipe, filas e automações existentes"],
    audience: ["Times comerciais", "Atendimento", "Empresas com comunicação recorrente com clientes"],
    limitations: ["A integração real com a Meta ainda depende de ativos externos e homologação", "Não deve ser apresentada como WhatsApp Business Platform integralmente homologada em produção"],
    cta: "Quero conhecer o BravMsg",
  },
  {
    slug: "bravacademy",
    name: "BravAcademy",
    category: "Universidade Corporativa White Label",
    status: "Em evolução",
    headline: "Transforme treinamentos dispersos em uma jornada corporativa organizada.",
    description: "A BravAcademy estrutura cursos, trilhas, avaliações e evidências de treinamento em uma experiência white label alinhada à identidade da empresa.",
    pain: ["Treinamentos em PDFs, links e vídeos soltos", "Baixa rastreabilidade de conclusão", "Dificuldade para avaliar aprendizado", "Falta de padronização"],
    benefits: ["Padronização", "Escala", "Rastreabilidade", "Evidência de treinamento"],
    capabilities: ["Cursos e aulas", "Trilhas", "Assessments e avaliações", "Progresso", "Certificados e verificação", "Branding white label", "Gestão de alunos e mídia"],
    audience: ["Empresas com treinamento recorrente", "RH e Desenvolvimento", "Operações que precisam comprovar capacitação"],
    limitations: ["Políticas de reprodução e mídia devem respeitar o estado homologado do produto"],
    cta: "Quero conhecer o BravAcademy",
  },
  {
    slug: "bravvideo",
    name: "BravVideo",
    category: "Produção audiovisual corporativa com IA",
    status: "Em homologação",
    headline: "Uma frente experimental para tornar conteúdo corporativo mais escalável.",
    description: "O BravVideo é uma tecnologia em desenvolvimento para produção audiovisual corporativa com apresentadores virtuais, composição de cenas, identidade visual e futura conexão com experiências de aprendizagem.",
    pain: ["Gravações humanas caras e lentas", "Nova gravação quando o conteúdo muda", "Dificuldade de padronizar apresentadores e cenas", "Escala limitada de produção"],
    benefits: ["Visão de padronização", "Potencial de redução de retrabalho", "Escala futura de conteúdo", "Integração estratégica com aprendizagem"],
    capabilities: ["Apresentadores virtuais", "Composição de cenas", "Identidade visual", "Legendas", "Aulas e conteúdo corporativo", "Integração futura com BravAcademy"],
    audience: ["Empresas com treinamento recorrente", "Times de comunicação interna", "Operações com alta demanda de conteúdo"],
    limitations: ["Tecnologia em homologação", "Não é produto finalizado", "Dependências de provedores externos ainda estão em validação"],
    cta: "Quero acompanhar o BravVideo",
  },
];

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
