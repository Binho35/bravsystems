# BRAVSYSTEMS — POLÍTICA CORPORATIVA GITHUB-FIRST

**Proprietário:** Robson  
**Aplicação:** todos os repositórios, produtos, agentes, chats, sessões e ambientes de desenvolvimento da BravSystems.  
**Status:** regra permanente.

## Regra-mãe

> **GitHub é a fonte de verdade, continuidade e preservação de todos os projetos da BravSystems.**

Mac, notebooks, computadores, VMs e outros ambientes físicos são estações de trabalho auxiliares. Nenhum deles pode ser a única fonte de uma evolução concluída.

## Precedência

1. GitHub / branch oficial do projeto.
2. Ambiente local sincronizado com essa branch.
3. MEC, memória de conversa, contexto e documentação auxiliar.

MEC e contexto ajudam a recuperar decisões, mas não substituem o estado verificável do repositório.

## Regra operacional

- ao concluir um bloco relevante: validar, commit, push e confirmar o SHA remoto;
- GitHub e ambiente local devem permanecer em paralelo;
- depois da reconciliação inicial de qualquer WIP existente, o GitHub deve ficar **igual ou à frente** do hardware local;
- nenhuma implementação concluída deve permanecer apenas local;
- deploy e homologação devem apontar para código versionado sempre que tecnicamente possível.

## Mac ou hardware offline

A indisponibilidade do Mac **não interrompe o projeto**.

Se a tarefa puder ser executada com segurança a partir do estado remoto:

> **continuar pelo GitHub.**

Quando o hardware voltar:

```text
GitHub -> ambiente local -> revalidação
```

A única exceção é quando existir evidência concreta de WIP local legítimo ainda não publicado. Nesse caso, preservar esse WIP, reconciliar sem perda e publicá-lo no GitHub. A exceção termina após a reconciliação.

## Proibição

Não é permitido tratar como fluxo normal:

- código importante apenas no Mac;
- "depois eu subo";
- parar o projeto apenas porque o hardware está offline;
- usar MEC/memória/chat como fonte principal do código;
- sobrescrever divergências sem auditoria;
- destruir WIP local para forçar igualdade;
- fazer merge, produção ou ações irreversíveis sem respeitar a governança específica do projeto.

## Relação com regras locais

Cada repositório pode ter regras adicionais de branch, PR, Quality, segurança e release.

Essas regras continuam válidas.

Esta política define apenas a premissa corporativa de preservação e continuidade:

> **o trabalho pertence ao GitHub; o hardware é substituível.**

## Gate de conclusão

Uma tarefa relevante não está protegida enquanto não houver:

- código/documentação relevante versionados;
- commit;
- push;
- SHA remoto identificável;
- testes/checks aplicáveis;
- documentação de continuidade atualizada quando exigida.

---

Documento canônico corporativo da BravSystems.
