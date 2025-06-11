import { createFeature, createReducer, on } from "@ngrx/store";
import { increment, reset } from "./test-broadcast-and-ng-rx.actions";

export interface AppState { counter: number; }
export const initialState: AppState = { counter: 0 };

export const counterFeature = createFeature({
  name: 'counterFeature',
  reducer: createReducer(
   initialState,
    on(increment, (state) => ({ ...state, counter: state.counter + 1 })),
    on(reset, (state) => ({ ...state, counter: 0 }))
  )
});