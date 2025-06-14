import { createAction, props } from '@ngrx/store';

export const addRow = createAction('[Table] Add Row', props<{ row: {id: number, name: string};  sendThroughBroadcast: boolean }>());
export const removeRow = createAction('[Table] Remove Row', props<{ id: number; sendThroughBroadcast: boolean }>());