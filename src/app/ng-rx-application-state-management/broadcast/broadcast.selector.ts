import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./broadcast.reducer";

export const selectCounterFeatureState = createFeatureSelector<AppState>("testFeature");

export const selectCounter = createSelector(
    selectCounterFeatureState,
    state => state.counter
);

export const selectLastBroadcastAction = createSelector(
  selectCounterFeatureState,
  (state) => state.lastBroadcastAction
);