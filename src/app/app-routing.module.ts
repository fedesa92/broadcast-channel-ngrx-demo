import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'students',
        pathMatch: 'full',
      },
      {
        path: 'students',
        loadChildren: () =>
          import('src/app/students/feature-list').then((m) => m.FeatureListModule),
      },
      {
        path: 'lessons',
        loadChildren: () =>
          import('src/app/lessons/feature-list').then(
            (m) => m.FeatureListModule
          ),
      },
      { 
        path: 'counter',
        loadChildren: () =>
          import('src/app/test-broadcast-and-ng-rx/test-broadcast-and-ng-rx.module').then(
            (m) => m.CounterModule
          )
      }
    ])
  ],
})
export class AppRoutingModule {}
