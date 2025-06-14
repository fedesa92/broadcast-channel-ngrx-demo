import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'page',
        pathMatch: 'full'
      },
      {
        path: 'page',
        loadChildren: () =>
          import('src/app/test-broadcast-and-ng-rx/test-broadcast-and-ng-rx.module').then((m) => m.TestBroadcastAndNgRxModule),
      }
    ])
  ],
})
export class AppRoutingModule {}
