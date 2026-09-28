# SDD — Site Institucional BravSystems

> **Software Design Document — BravSystems**  
> Estado: **BASELINE INICIAL DE GOVERNANÇA**  
> Data: **2026-09-28**  
> Este documento não declara o site como Production Ready.

## 1. Objetivo

Este SDD consolida arquitetura, integrações, segurança, qualidade e operação do site institucional da BravSystems. Mudanças estruturais relevantes devem atualizar este arquivo ou gerar ADR em `docs/adr/`.

## 2. Propósito do produto

Site institucional e comercial da BravSystems para apresentação do portfólio, captação de contatos e suporte à experiência comercial dos produtos.

## 3. Evidências confirmadas

- **COMPROVADO:** Next.js 16.3.4.
- **COMPROVADO:** React 19.2.8.
- **COMPROVADO:** TypeScript.
- **COMPROVADO:** Tailwind CSS 4.
- **COMPROVADO:** existe script de testes via `node --test`.
- **COMPROVADO:** o repositório declara homepage hospedada na Vercel.

## 4. Arquitetura lógica

- Aplicação web Next.js.
- Renderização e rotas sob o App Router conforme estrutura atual do projeto.
- Conteúdo institucional e comercial no mesmo produto.
- Integrações externas devem ser isoladas de componentes puramente visuais.
- Formulários e endpoints server-side devem aplicar validação e proteção contra abuso.

## 5. Domínios e módulos

- Home institucional.
- Portfólio de produtos.
- Páginas comerciais.
- Conteúdo institucional.
- Formulário de contato.
- Assets visuais e vídeo.
- SEO/metadata.
- Analytics quando habilitado.
- Integrações comerciais.

## 6. Dados e persistência

O site não possui PostgreSQL/Prisma confirmado nesta baseline.

Qualquer persistência futura deve documentar:
- finalidade;
- dados coletados;
- retenção;
- base legal quando aplicável;
- provider;
- backup/restore;
- acesso.

## 7. Segurança

- Secrets não devem ser versionados.
- Formulários precisam de validação server-side.
- Rate limiting deve ser compatível com ambiente serverless/distribuído.
- Headers de segurança devem ser auditados.
- Dependências precisam de auditoria periódica.
- Dados de contato não devem aparecer em logs além do necessário.

## 8. Integrações

Toda integração deve registrar:
- finalidade;
- provider;
- autenticação;
- dados enviados;
- limites;
- timeout/retry;
- custo;
- observabilidade;
- fallback.

Integrações não comprovadas nesta baseline permanecem **A AUDITAR**.

## 9. Deploy e ambientes

Ambientes esperados:
- desenvolvimento;
- preview/homologação;
- produção.

Production Ready exige:
- deploy reproduzível;
- rollback;
- domínio/DNS/TLS;
- secrets por ambiente;
- validação de formulário;
- smoke pós-deploy;
- observabilidade.

## 10. Qualidade

Gates mínimos:
- lint;
- TypeScript;
- build;
- testes automatizados;
- links/rotas críticas;
- formulário;
- responsividade;
- Lighthouse/Core Web Vitals quando aplicável;
- smoke de produção.

## 11. Observabilidade e operação

Documentar:
- erros;
- logs;
- métricas;
- uptime;
- alertas;
- formulário;
- incidentes;
- runbook.

Sem evidência, o item permanece **NÃO AUDITADO**.

## 12. Backup e continuidade

Conteúdo crítico, assets e configurações devem ter fonte versionada ou recuperação documentada. Dados externos coletados por formulários devem seguir a política do provider correspondente.

## 13. FinOps

Registrar:
- Vercel/hospedagem;
- domínio;
- e-mail/formulários;
- analytics;
- storage/CDN;
- APIs externas.

Ausência de medição = **NÃO MEDIDO**.

## 14. Lacunas atuais

- **A AUDITAR:** headers de segurança completos.
- **A AUDITAR:** rate limit distribuído do formulário.
- **A AUDITAR:** observabilidade e alertas.
- **A AUDITAR:** política formal de retenção de leads.
- **A AUDITAR:** custos recorrentes.
- **A AUDITAR:** estratégia de rollback e incident response.
- **A AUDITAR:** inventário completo de integrações externas.

## 15. ADR

Decisões estruturais devem ser registradas em `docs/adr/ADR-XXXX-<decisao>.md` com contexto, decisão, alternativas e consequências.

## 16. Atualização obrigatória

Atualizar este SDD quando houver mudança material em arquitetura, formulários, integrações, deploy, segurança, analytics, observabilidade ou dependência crítica.

## 17. Histórico

| Data | Versão | Alteração |
|---|---|---|
| 2026-09-28 | 1.0 | Baseline inicial padronizada de SDD BravSystems. |
