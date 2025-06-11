import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./test-broadcast-and-ng-rx.reducer";

export const selectCounterFeatureState = createFeatureSelector<AppState>("counterFeature")

export const selectCounter = createSelector(
    selectCounterFeatureState,
    state => state.counter
)
