import { createAction, props } from "@ngrx/store";

export const increment = createAction(
  '[Counter] Increment',
  props<{ source: 'local' | 'broadcast' }>()
);

export const reset = createAction(
  '[Counter] Reset',
  props<{ source: 'local' | 'broadcast' }>()
);