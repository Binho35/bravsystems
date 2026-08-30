# BravAcademy no portfólio BravSystems

Data: 2026-08-30

## Objetivo
Integrar **BravAcademy — Universidade Corporativa White Label** ao portfólio comercial da BravSystems sem alterar a arquitetura do site, o fluxo Resend ou as integrações existentes.

## Escopo da integração
- adicionar BravAcademy à lista de soluções;
- adicionar BravMsg ao portfólio para refletir o ecossistema atual;
- incluir BravMsg e BravAcademy no seletor de interesse do formulário;
- preservar o assunto dinâmico do lead no formato `Novo contato BravSystems — ${interest}`;
- atualizar a frase de portfólio no e-mail automático de boas-vindas;
- preservar hero, navegação, demonstrações, serviços, footer, Resend e variáveis de ambiente.

## Regras de compatibilidade
- nenhuma alteração de secrets;
- nenhuma alteração de domínio;
- nenhuma alteração da integração Resend;
- nenhuma referência a homologação Meta no BravMsg;
- nenhuma criação de vídeo ou arquivo inexistente;
- mudanças de `app/page.tsx` devem ser exclusivamente textuais/estruturais nos blocos indicados, sem reformatar o arquivo inteiro.

## BravAcademy
**Categoria:** Universidade corporativa e desenvolvimento

**Posicionamento:** Universidade corporativa personalizada para capacitação, desenvolvimento e gestão de conhecimento. Disponível em modelo white label.

**Funcionalidades comerciais:**
- Cursos e trilhas
- Avaliações e progresso
- Certificados
- Experiência white label

## BravMsg
Posicionamento comercial limitado ao que já existe no projeto: comunicação e relacionamento por WhatsApp, campanhas, inbox de atendimento, contatos/consentimentos, CRM e analytics. O material não declara homologação Meta.

## E-mail
Quando `interest=BravAcademy`, o backend existente gera naturalmente:

`Novo contato BravSystems — BravAcademy`

A lógica do assunto não deve ser alterada.
