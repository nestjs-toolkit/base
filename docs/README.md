[//]: # (// TODO revisar DOC)
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Summary

- [ENDPOINT](#endpoint)
- [Header](#header)
  - [Authorization](#authorization)
  - [Language](#language)
  - [Timezone](#timezone)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# ENDPOINT

# Header

Algumas das opções de header a serem enviadas:

## Authorization
Estamos trabalhando com o padrão JWT Bearer.

```text
Authorization: bearer x.x.x
```


## Language
Para tratar o idioma de resposta da API

```text
Accept-Language: en
```

## Timezone

Primeira maneira é definindo o OFFSET (pode ser enviado valores negativos):

```text
Time-Zone-Offset: 180
```

A segunda forma é informar o nome da zona:

```text
Time-Zone: America/Sao_Paulo
```

Exemplo de como pegar isso via JS:

```js
const dt = new Date();
const tzOffset = dt.getTimezoneOffset();
// OR
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
```

