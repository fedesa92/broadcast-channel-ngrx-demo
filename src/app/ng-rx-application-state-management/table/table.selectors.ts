import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TableState } from './table.reducer';

export const selectTableFeature = createFeatureSelector<TableState>('tableTestFeature');
export const selectAllRows = createSelector(selectTableFeature, s => s.rows);