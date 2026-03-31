# Requisitos Não Funcionais

## Objetivo

Definir a barra mínima de qualidade operacional do Exponencial enquanto o produto evolui por releases incrementais.

## NFR-01: Performance

- o app deve abrir de forma aceitável em rede móvel comum
- trocas de rota principais devem parecer imediatas depois do primeiro carregamento
- submissão e feedback de exercício devem ser rápidos o bastante para não quebrar o loop de estudo
- o bundle deve continuar sendo monitorado; crescimento por conteúdo não pode voltar a inflar o shell principal

Meta inicial:

- página inicial interativa em até 2,5 s em cenário mediano
- navegação entre teoria e prática com latência percebida abaixo de 300 ms quando já carregado

## NFR-02: Disponibilidade

- frontend estático deve ter alta disponibilidade via GitHub Pages no estágio inicial
- storage inicial em Supabase deve ser suficiente para perfis e progresso sem exigir backend próprio no início
- falhas de storage não devem corromper definitivamente o estado do aluno

Meta inicial:

- priorizar simplicidade operacional sobre arquitetura distribuída

## NFR-03: Segurança

- autenticação deve usar mecanismo confiável, com Supabase Auth como primeira camada prevista
- segredos não podem ficar expostos no cliente
- políticas de acesso devem ser definidas com Row Level Security ao introduzir dados de aluno
- o fluxo de entrega deve proteger `main` e exigir CI

## NFR-04: Privacidade e conformidade

- dados pessoais de aluno devem ser mínimos
- o produto deve prever consentimento e exclusão de conta
- o roadmap deve considerar LGPD desde a fase de autenticação
- menores de idade exigem cuidado maior com dados e comunicação

## NFR-05: Auditabilidade

- a plataforma deve conseguir explicar por que um aluno foi bloqueado, destravado ou considerado apto
- eventos importantes devem ser rastreáveis
- o histórico mínimo de tentativas e revisões deve ser persistido quando a fase Supabase entrar

Isso é crítico para:

- confiança pedagógica
- suporte
- políticas de devolução no futuro

## NFR-06: Observabilidade

- erros de runtime precisam ser capturáveis
- o produto deve medir eventos principais por release
- métricas de funil precisam existir antes de aumentar escopo

Eventos mínimos previstos:

- cadastro concluído
- início de lição
- envio de exercício
- aprovação
- bloqueio
- revisão disparada
- revisão concluída

## NFR-07: Testabilidade

- toda mudança de parser, contratos e regras de domínio deve ter testes automatizados
- a pipeline deve impedir merge com CI quebrada
- smoke tests de UI podem crescer depois, mas contratos e domínio não podem voltar a depender só de teste manual

## NFR-08: Manutenibilidade

- conteúdo curricular deve continuar fora da UI
- contratos de conteúdo e produto devem permanecer documentados
- IA e novos colaboradores devem conseguir entender a estrutura lendo poucos arquivos
- arquivos gerados continuam sendo saída, não fonte

## NFR-09: Acessibilidade

- fluxos principais de estudo devem ser navegáveis por teclado
- contraste, foco e estrutura semântica devem permanecer adequados
- feedback de erro e bloqueio deve ser claro

## NFR-10: Escalabilidade funcional

- a grade curricular deve poder crescer sem exigir refactor frequente da UI
- novas mecânicas, como solução animada passo a passo, devem entrar por contratos e componentes dedicados
- a evolução para mastery, recovery e spaced repetition não deve reintroduzir acoplamento entre conteúdo e shell

## NFR-11: Governança de release

- toda entrega deve apontar release alvo
- releases devem ser pequenas, verificáveis e cumulativas
- o backlog não pode ficar só em conversa; precisa aparecer em docs ou GitHub

## NFR-12: Custo operacional

- no estágio inicial, preferir GitHub Pages + Supabase em vez de backend próprio
- evitar serviços adicionais antes de validar o loop principal
- qualquer novo serviço precisa justificar custo, risco e ganho operacional
