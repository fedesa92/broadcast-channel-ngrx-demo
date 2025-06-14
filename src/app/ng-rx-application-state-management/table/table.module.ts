import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tableReducer } from './table.reducer';
import { TableEffects } from './table.effects';
import { TableService } from './table.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('tableTestFeature', tableReducer),
    EffectsModule.forFeature([TableEffects])
  ],
})
export class TableModule {
      static forRoot(): ModuleWithProviders<TableModule> {
        return {
            ngModule: TableModule,
            providers: [TableService]
        }
    }
}