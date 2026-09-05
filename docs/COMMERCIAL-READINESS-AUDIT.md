# BravSystems — Commercial Readiness & Conversion Audit

Agente: Marco  
Projeto: BravSystems — Site & Comercial  
Repositório: `Binho35/bravsystems`  
Branch auditada: `main`  
HEAD inicial: `13cc1e06e842aadf7be193f37b96abc448f74109`

## Escopo auditado

- estrutura da aplicação Next.js;
- home e portfólio;
- formulário comercial e API `/api/contact`;
- integração Resend;
- demonstrações e vídeo institucional;
- SEO e metadata;
- responsividade por inspeção estrutural;
- acessibilidade por inspeção de markup;
- segurança por inspeção de API/configuração;
- Vercel, produção e previews;
- readiness comercial por produto.

## Evidências principais

### Estrutura

A aplicação é enxuta e concentrada principalmente em `app/page.tsx`, `app/layout.tsx` e `app/api/contact/route.ts`. Não existem páginas dedicadas por produto no estado auditado.

### Formulário e Resend

O formulário coleta nome, empresa, e-mail, telefone, produto de interesse, mensagem e consentimento. Há honeypot anti-spam, validação server-side de obrigatórios, formato de e-mail e limites de tamanho.

O lead principal é enviado antes do e-mail de boas-vindas. Se a confirmação secundária falhar, a API apenas registra o erro e ainda retorna sucesso para o lead já recebido. Essa arquitetura deve ser preservada.

Pendência: não foi identificado rate limit explícito na rota de contato.

### Portfólio

Portfólio atual apresentado no site:

- BravOs;
- BravHas;
- BravHos;
- BravMsg;
- BravAcademy.

BravVideo não é apresentado como produto comercial pronto, o que está coerente com o mandato de governança.

### Risco de posicionamento

O BravOs ainda apresenta `Operação offline-first` como feature pública. Esse claim deve permanecer condicionado à confirmação de governança técnica.

A separação BravHas x BravHos está comunicada de forma funcional no site, porém a fronteira estratégica entre ambos continua dependente da definição central do portfólio.

### Demonstrações

A seção de demonstrações possui vídeo para BravOs e placeholders para BravHas e BravHos. Foram identificados textos com linguagem interna de desenvolvimento, como referências a arquivos futuros e vídeo em preparação. Comercialmente, isso reduz percepção de maturidade e deve ser substituído por CTA de solicitação de demonstração enquanto o material definitivo não estiver disponível.

BravMsg e BravAcademy não possuem demonstração apresentada nessa seção no estado auditado.

### SEO

Antes deste ciclo, a metadata ainda incluía `BravCrm`, nome fora do portfólio atual, e não existiam arquivos dedicados `sitemap.ts` e `robots.ts`.

Neste ciclo foram implementados:

- atualização de title e description;
- alinhamento das keywords com BravOs, BravHas, BravHos, BravMsg e BravAcademy;
- remoção da referência legada BravCrm;
- `app/sitemap.ts`;
- `app/robots.ts`.

Pendência: o site continua single-page; páginas dedicadas por produto aumentariam capacidade de indexação e intenção comercial, mas exigem um ciclo próprio.

### Segurança

A API de contato escapa HTML antes de montar o e-mail e não expõe a API key do Resend na resposta.

Neste ciclo foram adicionados headers básicos:

- `X-Content-Type-Options: nosniff`;
- `X-Frame-Options: DENY`;
- `Referrer-Policy: strict-origin-when-cross-origin`;
- `Permissions-Policy` restringindo câmera, microfone e geolocalização.

Pendências:

- rate limit explícito do formulário;
- Content-Security-Policy deve ser avaliada em ciclo dedicado para evitar quebra de mídia, fontes ou integrações.

### Vercel

Projeto identificado: `bravsystems` (`prj_fdzHcYt0INB83lMXBPRmv4JxZTtx`).

Produção auditada:

- commit `13cc1e06e842aadf7be193f37b96abc448f74109`;
- deployment em estado `READY`;
- domínios `bravsystems.com.br` e `www.bravsystems.com.br` associados ao projeto.

Preview da branch `feature/commercial-readiness` foi criado automaticamente pela integração GitHub/Vercel e ficou `READY` no commit que contém sitemap/robots.

Não foram encontrados erros de runtime no período de 7 dias consultado.

Nenhum domínio, DNS, environment de produção ou secret foi alterado.

## Readiness comercial por produto

### BravOs

Posicionamento: operação e gestão para restaurantes.  
CTA: contato comercial.  
Demo: vídeo disponível, porém a seção ainda contém linguagem interna de transição.  
Pendência: validar publicamente o claim `offline-first` antes de tratá-lo como capacidade concluída.

### BravHas

Posicionamento: gestão administrativa e financeira.  
CTA: contato comercial.  
Demo: não disponível; placeholder atual.  
Pendência: substituir placeholder técnico por CTA comercial até existir demonstração oficial.

### BravHos

Posicionamento: RH e Departamento Pessoal.  
CTA: contato comercial.  
Demo: não disponível; placeholder atual.  
Pendência: mesma correção de linguagem da área de demos e alinhamento contínuo da fronteira com BravHas.

### BravMsg

Posicionamento: comunicação, campanhas, atendimento, contatos, consentimentos e CRM.  
CTA: contato comercial.  
Demo: não apresentada na seção de demonstrações.  
Pendência: garantir que a comunicação pública não prometa integração Meta operacional antes da homologação.

### BravAcademy

Posicionamento: Universidade Corporativa White Label.  
CTA: contato comercial.  
Demo: não apresentada na seção de demonstrações.  
Pendência: evoluir apresentação comercial com demonstração ou fluxo de solicitação específico.

## Funil atual

`visita → portfólio → demonstrações/credibilidade → CTA → formulário → lead`

### Fricções principais

1. seção de demos expõe linguagem interna de desenvolvimento;
2. ausência de páginas individuais por produto limita SEO e aprofundamento comercial;
3. ausência de mensuração explícita de CTA, produto visitado e submit;
4. não há política de privacidade/termos visíveis no rodapé no estado auditado;
5. não há rate limit explícito do formulário;
6. algumas promessas técnicas precisam continuar subordinadas à governança dos produtos.

## Analytics

Não foi identificado mecanismo explícito de analytics no código auditado.

Proposta para ciclo posterior, sem ferramenta paga obrigatória:

- page view;
- clique em CTA;
- produto selecionado;
- submit iniciado;
- submit concluído;
- erro de submit.

A implementação deve respeitar LGPD e só introduzir consentimento adicional se a ferramenta/forma de tracking exigir.

## Prioridades

### P0

Nenhum bloqueador técnico crítico comprovado neste ciclo.

### P1

- limpar linguagem interna da seção de demonstrações;
- substituir demos indisponíveis por CTA comercial consistente;
- revisar claim `offline-first` do BravOs conforme governança;
- introduzir rate limit/filtro anti-abuso adequado ao formulário;
- publicar política de privacidade mínima e coerente com o formulário.

### P2

- criar páginas comerciais dedicadas por produto;
- implementar analytics de conversão sem tracking invasivo;
- melhorar structured data institucional;
- revisar imagem OpenGraph específica em 1200x630.

### P3

- otimização adicional de mídia e performance com medição real de Core Web Vitals;
- ampliação de conteúdo SEO por intenção de busca;
- testes automatizados de links e formulário.

## Evolução

Percentuais não foram declarados neste documento porque o ciclo atual não possui uma baseline objetiva e historicamente versionada que permita transformar os achados em percentual auditável sem arbitrariedade.

- Desenvolvimento: NÃO AUDITADO COM PRECISÃO
- Produto: NÃO AUDITADO COM PRECISÃO
- Produção: NÃO AUDITADO COM PRECISÃO
- Comercial: NÃO AUDITADO COM PRECISÃO

## Próximo marco recomendado

**Commercial Conversion Cleanup**: remover linguagem interna da área de demonstrações, ajustar CTA por disponibilidade real de cada produto, implementar proteção anti-abuso no formulário e adicionar política de privacidade enxuta, mantendo tudo no mesmo PR até homologação.
