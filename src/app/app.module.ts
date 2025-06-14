import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { API_URL } from './shared/tokens/api-url.token';
import { TableModule } from './ng-rx-application-state-management/table/table.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './ng-rx-application-state-management';
import { BroadcastModule } from './ng-rx-application-state-management/broadcast/broadcast.module';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    TableModule.forRoot(),
    BroadcastModule.forRoot(),
    StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateSerializability: true
            }
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router',
            routerState: RouterState.Minimal
        })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.api_url
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
