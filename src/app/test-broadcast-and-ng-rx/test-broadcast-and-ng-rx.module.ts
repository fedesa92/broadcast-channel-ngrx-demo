import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './test-broadcast-and-ng-rx.effects';
import { CounterComponent } from './test-broadcast-and-ng-rx.component';
import { testFeatureReducer } from './test-broadcast-and-ng-rx.reducer';
import { TabAComponent } from 'src/app/test-broadcast-and-ng-rx/components/tab-a.component';
import { TabBComponent } from 'src/app/test-broadcast-and-ng-rx/components/tab-b.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('testFeature', testFeatureReducer),
    EffectsModule.forFeature([CounterEffects]),
    RouterModule.forChild([
      { path: '', component: CounterComponent },
      { path: 'tab-a', component: TabAComponent },
      { path: 'tab-b', component: TabBComponent },
    ]),
  ],
})
export class CounterModule {}