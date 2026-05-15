# Feature Specification: Consultar Lançamento Cache & Re-fetch

**Feature Branch**: `[SPEC-02-consultar-lancamento-cache]`  
**Created**: 2026-04-08  
**Status**: Completed (Documenting Existing Implementation)
**Input**: User description: "Implement caching and re-fetching logic for the search results in the 'Consultar Lançamento' page to maintain state across navigation."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Persisting Search State (Priority: P1)

As a user, when I perform a search for financial records (lancamentos), I want my search filters and results to be preserved if I navigate away from the page and come back, so I don't have to re-enter the information.

**Why this priority**: Core UX requirement to prevent data loss and repetitive tasks when navigating the application (e.g., going to edit a record and returning).

**Independent Test**: Perform a search, navigate to the Dashboard, then click back to 'Consultar Lançamentos'. The previously searched records and filters should still be visible.

**Acceptance Scenarios**:

1. **Given** a user has performed a search with specific filters, **When** they navigate to another page (e.g., Home/Dashboard) and return to 'Consultar Lançamentos', **Then** the filters and search results should be automatically restored from storage.
2. **Given** restored search results, **When** the user performs a new search, **Then** the storage should be updated with the new filters and results.

---

### User Story 2 - Clearing Cache on Intentional Exit (Priority: P2)

As a user, when I navigate to 'Add New Record' or 'Home' intentionally (without the intention of returning to the current search), I want the search cache to be cleared so that I start with a fresh state next time.

**Why this priority**: Prevents stale data from cluttering the interface when starting a new task.

**Independent Test**: Click 'Adicionar' or 'Cancelar' (Home), then return to 'Consultar Lançamentos'. The search table should be empty.

**Acceptance Scenarios**:

1. **Given** a cached search state, **When** the user clicks the 'Adicionar' (Add) button, **Then** the search cache should be cleared before navigating.
2. **Given** a cached search state, **When** the user clicks the 'Cancelar' (Home) button, **Then** the search cache should be cleared before navigating.

---

### User Story 3 - Preserving Cache for Editing (Priority: P1)

As a user, when I click to 'Edit' a specific record, I want the search state to be preserved so that when I finish editing and return, I see the same list of records.

**Why this priority**: Essential for a smooth CRUD workflow where multiple records might need sequential editing.

**Independent Test**: Click 'Editar' on a record, then use the browser back button or a 'Return to Search' button (if available) to go back. The search state should be preserved.

**Acceptance Scenarios**:

1. **Given** a search result list, **When** the user clicks the 'Editar' (Edit) icon, **Then** a flag should be set to prevent cache clearing during unmounting, and the user is navigated to the edit page.

---

## Edge Cases

- **Session Expiration**: If the session expires while viewing cached results, any action that requires an API call (like 'Deletar' or 'Alterar Status') should handle the 401/403 error and redirect to login, while ideally clearing the cache.
- **Manual URL Navigation**: If the user manually changes the URL to leave the page, the current implementation (cleanup in `useEffect`) will clear the cache unless the 'edit' flag was set.
- **Empty Results**: If a search returns no results, the cache should be updated to reflect this empty state (SC-04 in implementation comments).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST store search filters (`ano`, `mes`, `tipoLancamento`) in `localStorage` under the key `_filtros_consulta` upon successful search.
- **FR-002**: System MUST store search results (normalized rows) in `localStorage` under the key `_resultados_consulta` upon successful search.
- **FR-003**: System MUST restore filters and results from `localStorage` during component mounting (`useEffect`).
- **FR-004**: System MUST clear search cache (`_filtros_consulta` and `_resultados_consulta`) upon component unmounting, UNLESS the navigation is to the edit page.
- **FR-005**: System MUST provide a 'Limpar' button to manually clear filters and results from both state and `localStorage`.
- **FR-006**: System MUST update the cached results automatically when a record is deleted or its status is updated.
- **FR-007**: System MUST implement a color scheme for the 'Situação' (Status) field:
    - **PENDENTE**: Yellow (warning)
    - **EFETIVADO**: Green (success)
    - **CANCELADO**: Red (error)
- **FR-008**: The color scheme MUST be visible in both the search results table (DataGrid) and the status change Dialog.
- **FR-009**: The 'Mês' (Month) column in the DataGrid MUST display the month name in Portuguese (pt-BR) instead of its numeric value (1-12).

### Key Entities

- **Lançamento**: Represents a financial record with attributes: `id`, `descricao`, `valor`, `tipoLancamento`, `mes`, `ano`, `statusLancamento`.
- **FiltroConsulta**: Object containing `ano`, `mes`, and `tipoLancamento`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Page load time for returning users (with cache) is reduced by avoiding one API call.
- **SC-002**: 100% of search state (filters + results) is restored after navigating to the edit page and back.
- **SC-003**: 0% stale data leakage between different users on the same machine (assuming `localStorage` is cleared on logout).

## Assumptions

- `LocalStorageService` is correctly implemented and available for use.
- The user is logged in (search requires `usuarioID`).
- Browsers used by the target audience support `localStorage`.
- Navigation to the edit page follows the pattern `/cadastrar-lancamento/:id`.
