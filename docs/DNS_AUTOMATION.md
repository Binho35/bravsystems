# BravSystems DNS Automation

## Fonte operacional

O DNS de `bravsystems.com.br` continua hospedado na Hostinger.

Os subdomínios de produtos gerenciados por automação ficam declarados em:

`infra/dns/bravsystems.managed.json`

O GitHub Actions usa o secret `HOSTINGER_API_TOKEN` e a API oficial da Hostinger para validar e aplicar somente os registros explicitamente gerenciados.

## Segurança

- O token nunca é salvo no repositório.
- A automação lê a zona existente antes de escrever.
- Se encontrar outro tipo de registro no mesmo hostname, interrompe sem alterar DNS.
- Antes de gravar, chama o endpoint oficial de validação da Hostinger.
- A atualização usa `overwrite=true` somente para o par nome/tipo enviado; outros registros, inclusive e-mail, não fazem parte do payload.
- Após gravar, a automação consulta novamente a API e confirma o estado final.
- Registros de e-mail, DKIM, DMARC, MX e nomes não declarados no arquivo gerenciado permanecem fora do escopo.

## Registro inicial gerenciado

- `bravmsg.bravsystems.com.br`
  - tipo: `CNAME`
  - destino Vercel: `7377b933eaceecd4.vercel-dns-017.com`
  - ambiente Vercel: Production
  - branch Vercel: `main`

## Fluxo para novos produtos

1. Confirmar no projeto Vercel o domínio de Production e o CNAME recomendado.
2. Adicionar o hostname e o destino em `infra/dns/bravsystems.managed.json`.
3. Abrir PR com a alteração.
4. Após merge em `main`, o workflow `Hostinger DNS Sync` aplica a mudança.
5. Validar o domínio no projeto Vercel.

Nunca inferir ou inventar um destino Vercel. Cada CNAME deve vir da tela/API do projeto correspondente.
