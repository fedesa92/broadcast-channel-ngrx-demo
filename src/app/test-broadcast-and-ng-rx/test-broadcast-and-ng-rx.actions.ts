import { createAction, props } from "@ngrx/store";

export const increment = createAction(
  '[Counter] Increment',
  props<{ source: 'local' | 'broadcast' }>()
);

export const reset = createAction(
  '[Counter] Reset',
  props<{ source: 'local' | 'broadcast' }>()
);

export const broadcastSendAction = createAction(
  '[Broadcast] Send Action',
  props<{ actionType: string; payload?: any }>()
);

export const broadcastReceivedAction = createAction(
  '[Broadcast] Received Action',
  props<{ actionType: string; payload?: any }>()
);