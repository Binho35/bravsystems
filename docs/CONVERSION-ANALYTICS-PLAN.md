# BravSystems — Plano de Mensuração de Conversão

## Objetivo

Preparar a mensuração comercial do site sem contratar ferramenta e sem introduzir tracking invasivo neste ciclo.

## Eventos essenciais

1. `cta_click`
   - produto ou seção de origem;
   - rótulo do CTA;
   - destino interno.

2. `product_interest`
   - produto selecionado ou originado pelo CTA;
   - sem dados pessoais.

3. `form_start`
   - primeira interação relevante com o formulário;
   - sem conteúdo digitado.

4. `form_submit`
   - tentativa de envio;
   - produto de interesse;
   - sem nome, e-mail, telefone ou mensagem.

5. `form_success`
   - lead principal aceito pelo backend;
   - produto de interesse;
   - sem PII.

## Eventos opcionais

- reprodução do vídeo institucional;
- conclusão aproximada de vídeo;
- navegação para Política de Privacidade;
- uso do contato direto por e-mail.

## Princípios de minimização

Não enviar para analytics:

- nome;
- e-mail;
- telefone;
- empresa quando puder identificar pessoa física;
- mensagem livre;
- conteúdo de campos do formulário;
- endereço IP capturado pela aplicação.

## Consentimento

### Essencial

Métricas estritamente técnicas e agregadas, quando implementadas de maneira compatível com a política e legislação aplicável, devem passar por validação de governança antes da ativação.

### Opcional / não essencial

Publicidade, remarketing, perfis comportamentais, pixels de terceiros ou tracking cross-site não fazem parte deste ciclo e exigem análise específica de finalidade, base legal, transparência e consentimento quando aplicável.

## Implementação futura sugerida

1. definir ferramenta e modelo de dados;
2. validar impacto LGPD;
3. atualizar Política de Privacidade;
4. criar camada única de eventos;
5. instrumentar CTA e formulário;
6. validar que payloads não contêm PII;
7. criar painel simples de funil:

`visita → interesse → formulário → envio → sucesso`

## Estado atual

PLANEJADO / NÃO INSTALADO.

Nenhuma ferramenta paga ou tracking adicional foi contratado ou ativado neste ciclo.
