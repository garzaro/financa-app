# SPEC — Tela de Gestão de Lançamentos Financeiros (Mobile-First)

**Versão:** 1.0  
**Plataforma-alvo:** Mobile (iOS/Android via Web) — adaptável a Desktop  
**Paradigma:** Spec-Driven Development (SDD)  
**Status:** Draft

---

## 1. Visão Geral e Objetivo

Esta tela permite ao usuário consultar, filtrar e gerenciar lançamentos financeiros (ex: ativos cripto, despesas, receitas) em dispositivos móveis.

A premissa central é a distinção de contexto de uso:

> **Desktop → análise.** O usuário explora dados.  
> **Mobile → consulta e ação rápida.** O usuário busca um item e age sobre ele.

Toda decisão de design deve ser orientada por esse princípio.

---

## 2. Domínio e Entidade Principal

### 2.1 Entidade: `Lancamento`

| Campo         | Tipo       | Visibilidade Mobile | Prioridade  |
|---------------|------------|----------------------|-------------|
| `descricao`   | string     | Sempre visível       | Essencial   |
| `valor`       | date       | Sempre visível       | Essencial   |
| `tipo`        | decimal    | Sempre visível       | Essencial   |
| `mes`         | enum       | Sempre visível       | Essencial   |
| `ano`         | enum       | Card secundário      | Secundário  |
| `status`      | string     | Card secundário      | Secundário  |
| `açoes`       | string     | Card secundário      | Secundário  |

> **Regra de negócio:** O campo `status` aceita os valores: `Ativo`, `Pendente`, `Cancelado`. A alternância de status é a ação mais frequente do usuário e deve ser acessível com um único toque.

---

## 3. Requisitos Funcionais

### RF-01 — Filtros Globais

- O sistema deve permitir filtrar lançamentos por:
  - **Ano** (dropdown)
  - **Tipo** (dropdown — ex: Cripto, Despesa, Receita)
- A combinação de filtros ativos deve ser exibida em formato resumido: `"2024 • Tipo: DESPESA"`.
- Os filtros **não validam** o campo Mês por padrão.

### RF-02 — Ações do Filtro

O sistema deve expor 4 ações relacionadas ao filtro:

| Ação        | Prioridade   | Comportamento                              |
|-------------|--------------|---------------------------------------------|
| `BUSCAR`    | Primária     | Executa a consulta com os filtros ativos    |
| `ADICIONAR` | Primária     | Abre tela/modal de criação de lançamento   |
| `LIMPAR`    | Secundária   | Reseta os filtros para o estado padrão      |
| `CANCELAR`  | Secundária   | Descarta alterações de filtro não aplicadas |

### RF-03 — Listagem de Lançamentos

- A lista deve exibir lançamentos no formato de **cards** (padrão Reflow).
- Cada card deve conter:
  - **Header:** ativo, tipo e tag de status colorida.
  - **Corpo:** grid 2×2 com os dados secundários (data, valor e outros campos).
  - **Footer:** 3 ícones de ação (Status, Lançamento, Excluir).
- O campo `valor` deve ser renderizado com fonte monoespaçada para garantir alinhamento decimal.

### RF-04 — Ações por Lançamento

| Ação                  | Ícone sugerido | Posição no card | Comportamento                                        |
|-----------------------|----------------|-----------------|------------------------------------------------------|
| Alternar Status       | Ícone circular | Esquerda        | Alterna o status para o próximo estado do enum      |
| Atualizar Lançamento  | Ícone de edição| Esquerda        | Abre modal ou bottom sheet de edição               |
| Excluir               | Ícone de lixeira | Direita       | Abre diálogo de confirmação centralizado na tela    |

> **Regra UX:** Um toque no **corpo do card** abre diretamente a tela de "Atualização de Lançamento" (ação mais frequente). O ícone de Status apenas alterna o estado, sem navegação.

### RF-05 — Confirmação de Exclusão

- Ao tocar em "Excluir", um **diálogo de confirmação** deve surgir no centro da tela.
- O diálogo deve conter: mensagem de confirmação + botão "Cancelar" + botão "Confirmar Exclusão".
- Não há ação de "desfazer" pós-confirmação (sem hover/undo nativo no mobile).

---

## 4. Requisitos de Interface (UI)

### 4.1 Cabeçalho Fixo (Sticky Header)

O cabeçalho é dividido em **duas linhas finas** fixas no topo durante o scroll.

```
+---------------------------------------+
| Linha 1:  [ Ano: 2026 ▼ ]  [ Tipo ▼ ] |  ← Dropdowns de filtro
+---------------------------------------+
| Linha 2:  [🔍] [🗑] [✕] [➕]           |  ← Ações (ícones + label curto)
+---------------------------------------+
```

- **Linha 1 (Inputs):** Dois seletores (dropdowns) lado a lado, com largura igual.
- **Linha 2 (Ações):** 4 ícones distribuídos horizontalmente.
  - `BUSCAR` → ícone de lupa
  - `LIMPAR` → ícone de lixeira
  - `CANCELAR` → ícone de X
  - `ADICIONAR` → ícone de `+`

> **CSS:** `position: sticky; top: 0; z-index: > z-index das linhas da tabela`

### 4.2 Layout do Card de Lançamento

```
+------------------------------------------+
| Bitcoin • CRIPTO              [● Ativo]   |  ← Header
+------------------------------------------+
| Data: 12/Abr/2026   | Valor: 0.00000005  |  ← Grid 2×2 (corpo)
| Campo D: xxxxxx     | Campo E: xxxxxx    |
+------------------------------------------+
| [⟳ Status]  [✏ Lançamento]    [🗑 Excluir]|  ← Footer de ações
+------------------------------------------+
```

- Altura mínima de cada card: suficiente para acomodar todos os campos sem truncamento.
- Separação entre cards: borda sutil ou sombra leve (`box-shadow`).

### 4.3 Filtros — Bottom Sheet (Mobile)

- Ao tocar no resumo de filtros ativos, uma **Bottom Sheet** (gaveta inferior) sobe com os controles completos de filtragem.
- A Bottom Sheet deve conter:
  - Seletor de Ano
  - Seletor de Tipo
  - Botões: `BUSCAR` (destaque/primário) e `ADICIONAR` (destaque/primário)
  - Botões: `LIMPAR` (contorno/secundário) e `CANCELAR` (contorno/secundário)

---

## 5. Requisitos de UX e Acessibilidade

### 5.1 Touch Targets

| Elemento                  | Tamanho mínimo da área de toque |
|---------------------------|----------------------------------|
| Linha/card inteiro        | 44px de altura mínima            |
| Ícones de ação no footer  | 44×44px por ícone                |
| Distância entre ícones    | ≥ 44px entre centros             |
| Botões na Bottom Sheet    | 48px de altura mínima            |

### 5.2 Hierarquia Visual nos Cards

- **Labels** dos campos: cor cinza suave, fonte menor (ex: 11–12px).
- **Valores** dos campos: cor preta/escura, fonte em negrito.
- **Tag de Status:** badge colorido por estado:
  - `Ativo` → Verde
  - `Pendente` → Amarelo/Âmbar
  - `Cancelado` → Vermelho/Cinza

### 5.3 Separação Semântica de Ações Destrutivas

- Ícones de "construção" (Status, Lançamento) → posicionados à **esquerda**.
- Ícone de "destruição" (Excluir) → posicionado à **direita**, com espaçamento visual adicional.

### 5.4 Pesquisa

- Exibida como **ícone de lupa** no cabeçalho.
- Ao tocar, expande em um campo de texto inline (sem mudar de página).

### 5.5 Paginação

- Padrão: **Scroll infinito** ou botão "Carregar mais" ao final da lista.
- Sem paginação numérica (inadequada para mobile).

---

## 6. Requisitos Não Funcionais

| Requisito          | Especificação                                                   |
|--------------------|------------------------------------------------------------------|
| Responsividade     | Mobile-first; adaptações progressivas para tablet e desktop     |
| Performance        | Cards renderizados com virtualização se lista > 50 itens        |
| Fonte numérica     | Fonte monoespaçada para campos de valor decimal                 |
| Z-index            | Cabeçalho sticky com `z-index` maior que o conteúdo scrollável  |
| Acessibilidade     | `aria-label` em todos os ícones de ação sem texto visível       |
| Feedback visual    | Loader/spinner durante chamadas de filtro/busca                  |

---

## 7. Comportamentos por Breakpoint

| Recurso              | Mobile (`< 768px`)                   | Tablet (`768–1024px`)         | Desktop (`> 1024px`)             |
|----------------------|--------------------------------------|-------------------------------|----------------------------------|
| Layout de dados      | Cards (Reflow)                       | Cards ou tabela compacta      | Tabela completa com 7 colunas    |
| Filtros              | Bottom Sheet (gaveta inferior)        | Barra horizontal + modal      | Barra horizontal fixa            |
| Colunas terciárias   | Ocultas (disponíveis em "detalhes")  | Visíveis no card expandido    | Visíveis na tabela               |
| Cabeçalho            | 2 linhas finas fixas (sticky)        | 1 linha compacta              | Barra completa                   |
| Pesquisa             | Ícone expansível                     | Campo inline                  | Campo sempre visível             |
| Paginação            | Scroll infinito / "Carregar mais"    | Scroll infinito               | Paginação numérica ou infinita   |
| Ações por linha      | Footer fixo no card (3 ícones)       | Footer no card ou inline      | Botões inline na linha           |

---

## 8. Fluxos de Interação Críticos

### Fluxo 1 — Filtrar e Buscar
1. Usuário vê o resumo `"2026 • Tipo: CRIPTO"` no header.
2. Toca → Bottom Sheet sobe.
3. Altera o Ano e/ou Tipo.
4. Toca em `BUSCAR` → Bottom Sheet fecha → lista recarrega.

### Fluxo 2 — Atualizar Lançamento
1. Usuário localiza o card desejado.
2. Toca no **corpo do card** → abre modal/tela de edição.
3. Edita os campos e confirma.
4. Card atualiza in-place na lista.

### Fluxo 3 — Alternar Status
1. Usuário toca no ícone `⟳ Status` no footer do card.
2. Tag de status altera visualmente de imediato (optimistic update).
3. Chamada de API ocorre em background; em caso de erro, reverte com toast.

### Fluxo 4 — Excluir Lançamento
1. Usuário toca no ícone `🗑 Excluir` (lado direito do footer).
2. Diálogo de confirmação aparece centralizado na tela (overlay).
3. Usuário confirma → card é removido da lista com animação de saída.
4. Usuário cancela → diálogo fecha, nenhuma alteração.

### Fluxo 5 — Adicionar Lançamento
1. Usuário toca no ícone `➕` no cabeçalho fixo.
2. Abre tela/modal de criação de lançamento.
3. Após salvar, novo card aparece no topo ou na posição correta da lista.

---

## 9. Componentes a Implementar

| Componente           | Descrição                                                                   |
|----------------------|-----------------------------------------------------------------------------|
| `StickyHeader`       | Cabeçalho de 2 linhas fixo com dropdowns e ícones de ação                  |
| `FilterSummaryBar`   | Exibe o resumo dos filtros ativos e dispara a Bottom Sheet                  |
| `FilterBottomSheet`  | Gaveta inferior com controles completos de filtro e ações                   |
| `LancamentoCard`     | Card completo com Header, Corpo (grid 2×2) e Footer de ações               |
| `StatusBadge`        | Tag colorida de status com mapeamento enum → cor                           |
| `ActionFooter`       | Footer do card com 3 ícones e espaçamento semântico                        |
| `ConfirmDeleteDialog`| Diálogo centralizado de confirmação de exclusão                             |
| `MonoValueDisplay`   | Renderização de valor decimal com fonte monoespaçada                       |
| `InfiniteList`       | Wrapper de scroll infinito ou botão "Carregar mais"                         |

---

## 10. Critérios de Aceite

- [ ] O cabeçalho (filtros + ações) permanece fixo durante o scroll da lista.
- [ ] Os filtros ativos são exibidos em formato resumido no header.
- [ ] A Bottom Sheet de filtros abre e fecha corretamente ao tocar no resumo.
- [ ] Cada lançamento é renderizado como card com Header, Corpo e Footer.
- [ ] O toque no corpo do card abre a tela de edição.
- [ ] O ícone de Status alterna o estado sem abrir nova tela.
- [ ] O ícone de Excluir está à direita do footer, com diálogo de confirmação.
- [ ] Todos os touch targets têm mínimo de 44×44px.
- [ ] Valores decimais são renderizados com fonte monoespaçada.
- [ ] A lista carrega mais itens via scroll infinito ou botão "Carregar mais".
- [ ] O layout se adapta corretamente nos breakpoints Mobile, Tablet e Desktop.
- [ ] Ícones de ação possuem `aria-label` descritivo.
