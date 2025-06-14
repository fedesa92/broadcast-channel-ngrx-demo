import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { selectLastBroadcastAction } from 'src/app/ng-rx-application-state-management/broadcast/broadcast.selector';
import { CommonModule } from '@angular/common';
import { broadcastSendAction } from '../../ng-rx-application-state-management/broadcast/broadcast.actions';
import { AgGridModule } from 'ag-grid-angular';
import { selectAllRows } from 'src/app/ng-rx-application-state-management/table/table.selectors';
import { addRow, removeRow } from 'src/app/ng-rx-application-state-management/table/table.actions';

@Component({
  selector: 'app-tab-b',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <h2>Tab B</h2>
    <button (click)="sendUpdate()">Invia Update</button>
    <div *ngIf="lastAction !== null">
      <h4>Azione ricevuta:</h4>
      <pre>{{ lastAction | json }}</pre>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 400px;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="{ flex: 1 }"
    >
    </ag-grid-angular>

    <button (click)="addRow()">Add Row from Tab B</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabBComponent implements OnInit {
  rowData: { id: number; name: string; }[];
  columnDefs = [{ field: 'id' }, { field: 'name' }];

  lastAction: any | null;

  constructor(private store: Store, private _cdr: ChangeDetectorRef) {
    this.lastAction = null;
    this.rowData = [];
  }

  ngOnInit(): void {
    this.store.select(selectLastBroadcastAction).pipe(
      filter((filteredValue: any) => filteredValue !== undefined)
    ).subscribe(({ actionType, payload }) => {
      console.log('TabB received:', payload);
      this.lastAction = payload;
      this._cdr.detectChanges();
    });

    this.store.select(selectAllRows).pipe(
      filter((filteredValue: any) => filteredValue !== undefined)
    ).subscribe((value) => {
      this.rowData = value;
    })
  }

  sendUpdate() {
    this.store.dispatch(
      broadcastSendAction({
        actionType: 'UPDATE_FROM_TAB_B',
        payload: { message: 'Ciao da Tab B!', timestamp: new Date() }
      })
    );
  }

  addRow() {
    const row = { id: Date.now(), name: `Item ${Date.now()}` };
    this.store.dispatch(broadcastSendAction({ actionType: 'ADD_ROW', payload: row }));
  }
}