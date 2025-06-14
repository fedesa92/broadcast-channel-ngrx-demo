import { createReducer, on } from "@ngrx/store";
import { broadcastReceivedAction } from "./broadcast.actions";

export interface AppState { 
  counter: number; 
  lastBroadcastAction?: { actionType: string; payload?: { message: string, timestamp: Date } };
}
export const initialState: AppState = { 
  counter: 0,
  lastBroadcastAction: undefined
};

export const testFeatureReducer = createReducer(
    initialState,
    on(broadcastReceivedAction, (state, action: { actionType: string; payload?: any; } ) => {
    // Aggiorna stato in base a quello che serve
    return { 
      ...state, 
      lastBroadcastAction: {
        actionType: action.actionType,
        payload: { ...action.payload }, // <-- forza un nuovo oggetto
        receivedAt: Date.now() // anche solo questo forza il cambio
      }
    };
  })
);