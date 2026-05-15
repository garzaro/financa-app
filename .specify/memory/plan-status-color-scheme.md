# Implementation Plan - Status Color Scheme in Consultar Lançamento

**Feature**: Status Color Scheme (FR-007, FR-008)
**Date**: 2026-04-09

## Proposed Changes

### 1. Update DataGrid Columns
- Import `Chip` component from `@mui/material`.
- Modify the `statusLancamento` column definition in `columns` useMemo.
- Add a `renderCell` function to display the status inside a `Chip` with appropriate colors:
    - `EFETIVADO` -> `color="success"`
    - `CANCELADO` -> `color="error"`
    - `PENDENTE` -> `color="warning"` (or custom yellow)

### 2. Update Status Dialog
- Modify the `RadioGroup` inside the `openStatusModal` Dialog.
- Ensure the `Radio` buttons reflect the colors:
    - `EFETIVADO` -> `color="success"`
    - `CANCELADO` -> `color="error"`
    - `PENDENTE` -> `color="warning"` (Currently it has no color, which defaults to primary).

## Verification Plan

### Manual Verification (Code Review & Logic Check)
- [ ] Verify that `Chip` is correctly imported.
- [ ] Verify that `renderCell` handles all three status values.
- [ ] Verify that the `Dialog` radio buttons match the requested logic.
- [ ] Check for any ESLint warnings or errors in the modified file.
