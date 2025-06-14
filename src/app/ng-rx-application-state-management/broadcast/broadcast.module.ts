import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BroadcastChannelService } from './broadcast-channel.service';
import { BroadcastEffects } from './broadcast.effects';
import { testFeatureReducer } from './broadcast.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('testFeature', testFeatureReducer),
    EffectsModule.forFeature([BroadcastEffects])
  ],
})
export class BroadcastModule {
      static forRoot(): ModuleWithProviders<BroadcastModule> {
        return {
            ngModule: BroadcastModule,
            providers: [BroadcastChannelService]
        }
    }
}