import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabAComponent } from 'src/app/test-broadcast-and-ng-rx/components/tab-a.component';
import { TabBComponent } from 'src/app/test-broadcast-and-ng-rx/components/tab-b.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    RouterModule.forChild([
      { path: '',  component: TabAComponent },
      { path: 'tab-b', component: TabBComponent }
    ]),
  ],
})
export class TestBroadcastAndNgRxModule {}

