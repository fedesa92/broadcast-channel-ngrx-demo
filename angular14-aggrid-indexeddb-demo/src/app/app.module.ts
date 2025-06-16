import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { MyGridComponent } from './my-grid/my-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { reducer } from './store/reducer';
import { IndexedDbService } from './indexed-db.service';
import { Store } from '@ngrx/store';

export function loadState(indexedDb: IndexedDbService, store: Store<any>) {
  return () => indexedDb.get('app-state').then(state => {
    if (state) {
      store.dispatch({ type: '[App] Load State', payload: state });
    }
  });
}

@NgModule({
  declarations: [AppComponent, MyGridComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ myState: reducer }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadState,
      deps: [IndexedDbService, Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}