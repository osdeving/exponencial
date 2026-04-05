# Produto

Este diretório concentra a base oficial de produto do Exponencial.

O objetivo desta documentação é deixar claro:

- qual problema o produto resolve
- qual é o estado-alvo do sistema
- quais requisitos e histórias orientam a implementação
- como validar se cada capacidade foi realmente entregue
- em que ordem as fases devem ser atacadas

## Ordem de leitura recomendada

1. [vision-roadmap.md](vision-roadmap.md)
2. [rms.md](rms.md)
3. [stories.md](stories.md)
4. [functional-spec.md](functional-spec.md)
5. [non-functional-requirements.md](non-functional-requirements.md)
6. [phases-and-estimates.md](phases-and-estimates.md)
7. [cdt.md](cdt.md)
8. [../architecture.md](../architecture.md)
9. [../technical/README.md](../technical/README.md)
10. [../delivery/trunk-based-delivery.md](../delivery/trunk-based-delivery.md)

## Papel de cada documento

- [vision-roadmap.md](vision-roadmap.md): visão do produto, objetivos, princípios e macrofases.
- [rms.md](rms.md): Requisito Mestre de Sistema com requisitos rastreáveis.
- [stories.md](stories.md): épicos, histórias e critérios de aceite.
- [functional-spec.md](functional-spec.md): comportamento funcional esperado e jornadas principais.
- [non-functional-requirements.md](non-functional-requirements.md): metas de qualidade, segurança, operação e desempenho.
- [phases-and-estimates.md](phases-and-estimates.md): plano por fases, dependências e esforço estimado.
- [cdt.md](cdt.md): Caderno de Testes de aceite.
- [../architecture.md](../architecture.md): DAS, a arquitetura-alvo do software.
- [../technical/README.md](../technical/README.md): documentação técnica detalhada.

## Regras de governança

- nenhuma feature entra em desenvolvimento sem fase alvo, história e critério de aceite
- toda mudança de contrato, dados, autenticação ou publicação de conteúdo deve refletir RMS, DAS e CDT quando aplicável
- o produto deve continuar perseguindo a ideia central: estudo curricular com progresso orientado por domínio
- conteúdo continua sendo fonte declarativa; o frontend é o renderer da experiência

## Regra prática

Esta base documental deve permitir duas coisas ao mesmo tempo:

- clareza de produto para priorização
- clareza de engenharia para implementação sem ambiguidade

Se um tema não estiver coberto por visão, RMS, histórias, DAS e CDT, ele ainda não está maduro o bastante para virar fatia de execução.
