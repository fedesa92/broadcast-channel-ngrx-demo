import { createFeature, createReducer, on } from "@ngrx/store";
import { increment, reset, broadcastReceivedAction } from "./test-broadcast-and-ng-rx.actions";

export interface AppState { 
  counter: number; 
  lastBroadcastAction?: { actionType: string; payload?: { message: string, timestamp: Date } };
}
export const initialState: AppState = { 
  counter: 0,
  lastBroadcastAction: undefined
};

// export const counterFeature = createFeature({
//   name: 'counterFeature',
//   reducer: createReducer(
//    initialState,
//     on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
//     on(reset, (state) => ({ ...state, counter: 0 })),
//     on(BroadcastActions.broadcastReceivedAction, (state, action: { actionType: string; payload?: any; } ) => {
//     // Aggiorna stato in base a quello che serve
//     return { ...state, lastBroadcastAction: { actionType, payload } };
//   })
//   )
// });

export const testFeatureReducer = createReducer(
    initialState,
    on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
    on(reset, (state) => ({ ...state, counter: 0 })),
    on(broadcastReceivedAction, (state, action: { actionType: string; payload?: any; } ) => {
    // Aggiorna stato in base a quello che serve
    return { 
      ...state, 
      lastBroadcastAction: {
        actionType: action.actionType,
        payload: { ...action.payload }, // <-- forza un nuovo oggetto
        // receivedAt: new Date(action.payload.timestamp)   // <-- oppure aggiungi un timestamp unico
        receivedAt: Date.now() // anche solo questo forza il cambio
      }
    };
  })
);