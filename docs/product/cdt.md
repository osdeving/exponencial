# CDT - Caderno de Testes de Aceite

## Objetivo

Definir os testes de aceite que validam se o produto atende as capacidades principais descritas em RMS e histórias.

## Convenção

- `CDT-AUTH-*`: autenticação e sessão
- `CDT-CONT-*`: conteúdo em runtime
- `CDT-PRG-*`: progresso e persistência
- `CDT-GATE-*`: gating e modo aberto
- `CDT-REV-*`: revisão e retenção
- `CDT-GAM-*`: gamificação
- `CDT-RANK-*`: ranking
- `CDT-AUD-*`: auditoria e operação

## Matriz resumida

| ID | Cenário | Histórias relacionadas |
| --- | --- | --- |
| CDT-AUTH-001 | Cadastro por email e senha | US-001 |
| CDT-AUTH-002 | Login social | US-002 |
| CDT-AUTH-003 | Sessão persistida e logout | US-003 |
| CDT-CONT-001 | Carregamento de teoria em runtime | US-005 |
| CDT-CONT-002 | Carregamento de exercícios em runtime | US-006 |
| CDT-CONT-003 | Publicação editorial sem redeploy do shell | US-017, US-018 |
| CDT-PRG-001 | Progresso sincronizado entre dispositivos | US-007 |
| CDT-PRG-002 | Indicadores de progresso por currículo | US-008, US-009 |
| CDT-GATE-001 | Bloqueio por domínio insuficiente | US-010, US-011 |
| CDT-GATE-002 | Habilitação deliberada do modo aberto | US-012 |
| CDT-REV-001 | Geração de fila diária de revisão | US-013 |
| CDT-REV-002 | Priorização de revisão sobre novo conteúdo | US-014 |
| CDT-GAM-001 | Pontos, badges e streak | US-015 |
| CDT-RANK-001 | Ranking multiusuário | US-016 |
| CDT-AUD-001 | Trilha de auditoria de eventos críticos | US-019 |

## Cenários de aceite

### CDT-AUTH-001 - Cadastro por email e senha

- Objetivo: validar criação de conta nativa.
- Pré-condições: usuário inexistente na base.
- Passos:
  1. acessar a tela de cadastro
  2. informar email válido e senha válida
  3. concluir cadastro
- Resultado esperado:
  - conta criada com sucesso
  - perfil associado ao usuário autenticado
  - sessão iniciada

### CDT-AUTH-002 - Login social

- Objetivo: validar login por provedor social.
- Pré-condições: provedor social configurado.
- Passos:
  1. acessar login
  2. escolher provedor social
  3. concluir autenticação externa
- Resultado esperado:
  - retorno ao app autenticado
  - perfil associado ao usuário
  - falhas são tratadas com feedback claro

### CDT-AUTH-003 - Sessão persistida e logout

- Objetivo: validar persistência segura da sessão.
- Pré-condições: usuário autenticado.
- Passos:
  1. fechar e reabrir o app
  2. verificar restauração da sessão
  3. executar logout
- Resultado esperado:
  - sessão válida é restaurada
  - logout encerra a sessão
  - dados de outro usuário não são expostos

### CDT-CONT-001 - Carregamento de teoria em runtime

- Objetivo: validar leitura de teoria publicada em runtime.
- Pré-condições: release de conteúdo publicada.
- Passos:
  1. abrir o catálogo
  2. selecionar uma lição
  3. observar carregamento da teoria
- Resultado esperado:
  - o app consulta o manifesto publicado
  - a teoria correta é carregada sob demanda
  - a versão da release é identificável

### CDT-CONT-002 - Carregamento de exercícios em runtime

- Objetivo: validar leitura de exercícios da release publicada.
- Pré-condições: lição com questionário publicado.
- Passos:
  1. abrir a lição
  2. iniciar exercícios
  3. navegar pelas questões
- Resultado esperado:
  - os exercícios são carregados sob demanda
  - gabarito e solução correspondem à mesma release
  - a prática ocorre sem rebuild do frontend

### CDT-CONT-003 - Publicação editorial sem redeploy do shell

- Objetivo: validar o fluxo editorial.
- Pré-condições: shell web já publicado.
- Passos:
  1. alterar um arquivo Markdown
  2. executar validação e publicação
  3. reabrir a lição no app
- Resultado esperado:
  - a nova release aparece no app
  - o shell web não precisou de novo deploy
  - rollback para release anterior é possível

### CDT-PRG-001 - Progresso sincronizado entre dispositivos

- Objetivo: validar persistência em nuvem.
- Pré-condições: mesmo usuário com dois dispositivos.
- Passos:
  1. concluir uma lição no dispositivo A
  2. autenticar no dispositivo B
  3. abrir o dashboard
- Resultado esperado:
  - o progresso concluído no dispositivo A aparece no B
  - score, tentativa e domínio são consistentes

### CDT-PRG-002 - Indicadores de progresso por currículo

- Objetivo: validar sensação de avanço.
- Pré-condições: usuário com parte do currículo concluída.
- Passos:
  1. abrir home, tópico e dashboard
  2. comparar indicadores exibidos
- Resultado esperado:
  - o progresso por lição, tópico, trilha e global é coerente
  - o próximo passo recomendado é consistente com o estado salvo

### CDT-GATE-001 - Bloqueio por domínio insuficiente

- Objetivo: validar gating pedagógico.
- Pré-condições: usuário com score abaixo do limiar.
- Passos:
  1. concluir exercício abaixo do corte
  2. tentar avançar para a próxima etapa da sequência padrão
- Resultado esperado:
  - o acesso padrão à próxima etapa fica bloqueado
  - o sistema explica o motivo
  - o sistema indica o próximo passo recomendado

### CDT-GATE-002 - Habilitação deliberada do modo aberto

- Objetivo: validar o override consciente.
- Pré-condições: usuário bloqueado na progressão padrão.
- Passos:
  1. selecionar a opção de abrir tudo
  2. ler a explicação
  3. confirmar deliberadamente
- Resultado esperado:
  - a confirmação é obrigatória
  - o conteúdo fica navegável sem bloqueio padrão
  - a decisão fica registrada para auditoria

### CDT-REV-001 - Geração de fila diária de revisão

- Objetivo: validar formação da fila de revisão.
- Pré-condições: usuário com habilidades que atingiram critério de revisão.
- Passos:
  1. aguardar ou simular vencimento de itens
  2. abrir home/dashboard
- Resultado esperado:
  - itens de revisão aparecem na fila diária
  - a fila diferencia prioridade e vencimento
  - concluir revisão atualiza o estado correspondente

### CDT-REV-002 - Priorização de revisão sobre novo conteúdo

- Objetivo: validar recomendação principal orientada por retenção.
- Pré-condições: usuário com revisão vencida e conteúdo novo disponível.
- Passos:
  1. abrir home
  2. observar a recomendação principal
- Resultado esperado:
  - a revisão aparece antes do novo conteúdo quando o limiar exigir
  - o usuário entende por que aquilo foi priorizado

### CDT-GAM-001 - Pontos, badges e streak

- Objetivo: validar gamificação básica.
- Pré-condições: usuário com sequência de estudo e metas atingidas.
- Passos:
  1. concluir estudo em dias consecutivos
  2. atingir regra de badge
  3. consultar painel
- Resultado esperado:
  - pontos são atualizados
  - streak é calculada corretamente
  - badges são liberadas conforme regra

### CDT-RANK-001 - Ranking multiusuário

- Objetivo: validar leaderboard.
- Pré-condições: múltiplos usuários com pontuação válida.
- Passos:
  1. autenticar com usuário de teste
  2. abrir ranking
  3. comparar posição relativa
- Resultado esperado:
  - ranking reflete dados persistidos
  - o usuário vê sua posição
  - o ranking não expõe dados indevidos

### CDT-AUD-001 - Trilha de auditoria de eventos críticos

- Objetivo: validar auditabilidade mínima.
- Pré-condições: usuário executou login, estudo, bloqueio, override e revisão.
- Passos:
  1. consultar trilha de eventos operacionais
  2. filtrar por usuário e período
- Resultado esperado:
  - eventos críticos aparecem com contexto mínimo suficiente
  - é possível relacionar evento com usuário e release de conteúdo
  - o acesso respeita políticas de segurança

## Regra de aceite

Uma história só deve ser considerada atendida quando:

- o cenário correspondente do CDT tiver sido executado ou automatizado
- o resultado esperado tiver sido observado
- a evidência mínima tiver sido registrada
