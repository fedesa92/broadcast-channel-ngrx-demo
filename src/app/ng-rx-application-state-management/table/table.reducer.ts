import { createReducer, on } from '@ngrx/store';
import { addRow, removeRow } from './table.actions';

export interface TableState { rows: {id: number, name: string}[] }
export const initialTableState: TableState = { rows: [] };

export const tableReducer = createReducer(
  initialTableState,
  on(addRow, (state, { row }) => ({ ...state, rows: [...state.rows, row] })),
  on(removeRow, (state, { id }) => ({
    ...state,
    rows: state.rows.filter(r => r.id !== id)
  }))
);