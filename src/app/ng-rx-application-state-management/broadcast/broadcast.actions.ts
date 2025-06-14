import { createAction, props } from "@ngrx/store";

export const broadcastSendAction = createAction(
  '[Broadcast] Send Action',
  props<{ actionType: string; payload?: any }>()
);

export const broadcastReceivedAction = createAction(
  '[Broadcast] Received Action',
  props<{ actionType: string; payload?: any }>()
);