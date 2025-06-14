import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./test-broadcast-and-ng-rx.reducer";

export const selectCounterFeatureState = createFeatureSelector<AppState>("testFeature");

export const selectCounter = createSelector(
    selectCounterFeatureState,
    state => state.counter
);

export const selectLastBroadcastAction = createSelector(
  selectCounterFeatureState,
  (state) => state.lastBroadcastAction
);