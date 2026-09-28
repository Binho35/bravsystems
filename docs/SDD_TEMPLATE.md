# SDD — <NOME DO PRODUTO>

> **Software Design Document — BravSystems**  
> Estado: **BASELINE INICIAL / EM MANUTENÇÃO / CERTIFICADO**  
> Data: **AAAA-MM-DD**  
> Branch/HEAD de referência: `<branch>` / `<sha>`  
> Este documento não declara Production Ready sem evidência operacional completa.

## 1. Objetivo

Descrever como o produto funciona tecnicamente, quais são suas fronteiras, dados, integrações, controles de segurança, qualidade, operação e decisões arquiteturais relevantes.

## 2. Propósito do produto

<descrever finalidade, público e problema resolvido>

## 3. Evidências confirmadas

Use apenas evidências sustentadas por código, configuração, workflow, documentação versionada ou operação comprovada.

- **COMPROVADO:** ...
- **ESTIMADO:** ...
- **A AUDITAR:** ...
- **NÃO MEDIDO:** ...

## 4. Arquitetura lógica

Descrever:
- frontend;
- backend;
- persistência;
- filas/eventos;
- storage;
- serviços;
- integrações;
- fronteiras de tenant/empresa;
- dependências críticas.

## 5. Domínios e módulos

- ...
- ...
- ...

## 6. Dados e persistência

Registrar:
- banco/engine;
- ORM;
- principais entidades;
- migrations;
- constraints;
- índices;
- isolamento;
- retenção;
- backup/restore.

## 7. Autenticação, autorização e segurança

Registrar:
- autenticação;
- sessão;
- RBAC;
- escopo;
- secrets;
- headers;
- rate limiting;
- auditoria;
- proteção de rotas;
- classificação de dados.

## 8. Integrações externas

Para cada integração:
- finalidade;
- provider;
- autenticação;
- endpoint/contrato;
- limites;
- timeout/retry;
- idempotência;
- dados enviados;
- custo;
- homologação;
- observabilidade.

## 9. Deploy e ambientes

Registrar:
- desenvolvimento;
- homologação;
- produção;
- CI/CD;
- deploy;
- rollback;
- DNS/TLS;
- secrets;
- dependências por ambiente.

## 10. Qualidade e testes

Registrar:
- build/typecheck;
- lint;
- unitários;
- integração;
- E2E;
- segurança;
- migrations;
- smoke;
- performance;
- homologação humana.

## 11. Observabilidade e operação

Registrar:
- logs;
- métricas;
- erros;
- alertas;
- health checks;
- runbook;
- incidentes;
- SLA/SLO quando aplicável.

## 12. Backup, restore e continuidade

Registrar:
- política de backup;
- retenção;
- restore testado;
- RPO;
- RTO;
- DR;
- responsável operacional.

## 13. FinOps

Registrar:
- infraestrutura;
- banco;
- storage;
- APIs;
- IA;
- observabilidade;
- fornecedores;
- custo unitário;
- custo por tenant/usuário/transação quando aplicável.

Nunca inventar valores. Sem evidência = **NÃO MEDIDO**.

## 14. Riscos e lacunas

- **A AUDITAR:** ...
- **BLOQUEADO:** ...
- **NÃO MEDIDO:** ...

## 15. ADR — Architecture Decision Records

Decisões estruturais relevantes devem ser registradas em:

`docs/adr/ADR-XXXX-<decisao>.md`

Conteúdo mínimo:
- contexto;
- decisão;
- alternativas;
- consequências;
- data;
- responsável.

## 16. Critério de atualização

Atualizar o SDD quando houver mudança material em:
- arquitetura;
- schema;
- autenticação/RBAC;
- integração;
- deploy/infra;
- segurança;
- observabilidade;
- backup/DR;
- dependência crítica;
- fluxo operacional.

## 17. Histórico

| Data | Versão | Alteração |
|---|---|---|
| AAAA-MM-DD | 1.0 | Baseline inicial. |
