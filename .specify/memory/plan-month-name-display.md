# Implementation Plan - Month Name Display in Consultar Lançamento

**Feature**: Month Name Display (FR-009)
**Date**: 2026-04-09

## Proposed Changes

### 1. Update DataGrid Columns in `src/pages/lancamentos/consultar-lancamento.jsx`
- Modify the `mes` column definition in the `columns` useMemo.
- Implement a `valueFormatter` or update `renderCell` to convert the numeric value (1-12) to the full month name in Portuguese.
- Use `new Date(0, params.value - 1).toLocaleDateString('pt-BR', { month: 'long' })` or a similar robust method to ensure consistent naming with the filter component.
- Ensure the first letter is capitalized for better UI presentation.

## Verification Plan

### Manual Verification (Code Review & Logic Check)
- [ ] Verify that numeric month values (1, 2, 3...) are correctly mapped to (Janeiro, Fevereiro, Março...).
- [ ] Ensure no regression in the table layout or data grid functionality.
- [ ] Check for any ESLint warnings or errors in the modified file.
