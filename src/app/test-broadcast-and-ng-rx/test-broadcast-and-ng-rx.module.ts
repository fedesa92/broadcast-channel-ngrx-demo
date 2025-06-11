import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { counterFeature } from './test-broadcast-and-ng-rx.reducer';
import { CounterEffects } from './test-broadcast-and-ng-rx.effects';
import { CounterComponent } from './test-broadcast-and-ng-rx.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(counterFeature),
    EffectsModule.forFeature([CounterEffects]),
    RouterModule.forChild([
      { path: '', component: CounterComponent }
    ]),
  ],
})
export class CounterModule {}
