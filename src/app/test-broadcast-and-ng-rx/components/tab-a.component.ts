import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { selectLastBroadcastAction } from 'src/app/ng-rx-application-state-management/broadcast/broadcast.selector';
import { CommonModule } from '@angular/common';
import { broadcastSendAction } from '../../ng-rx-application-state-management/broadcast/broadcast.actions';
import { AgGridModule } from 'ag-grid-angular';
import { selectAllRows } from 'src/app/ng-rx-application-state-management/table/table.selectors';

@Component({
  selector: 'app-tab-a',
  standalone: true,
  imports: [CommonModule, AgGridModule],
  template: `
    <h2>Tab A</h2>
    <button (click)="sendUpdate()">Invia Update</button>
    <div *ngIf="lastAction !== null">
      <h4>Azione ricevuta:</h4>
      <pre>{{ lastAction | json }}</pre>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 400px;"
      class="ag-theme-alpine"
      [rowData]="rowDataResultSet"
      [columnDefs]="columnDefs"
      [defaultColDef]="{ flex: 1 }"
    >
    </ag-grid-angular>    
    <button (click)="addRowA()">Add Row from Tab A</button>
  `
})
export class TabAComponent implements OnInit {
  private _rowData$ = this.store.select(selectAllRows);

  rowDataResultSet: {
    id: number;
    name: string;
  }[];
  columnDefs = [{ field: 'id' }, { field: 'name' }];

  lastAction: any | null;

  constructor(private store: Store, private _cdr: ChangeDetectorRef) {
    this.lastAction = null;
    this.rowDataResultSet = [];
  }

  ngOnInit(): void {
    this.store.select(selectLastBroadcastAction).pipe(
      filter((filteredValue: any) => filteredValue !== undefined)
    ).subscribe(({ actionType, payload }) => {
      console.log('TabA received:', payload);
      this.lastAction = payload;

      if (actionType === 'ADD_ROW'){
         this.rowDataResultSet = [...this.rowDataResultSet, payload];
      } else if (actionType === 'REMOVE_ROW') {
        
      }

      this._cdr.detectChanges();
    });

  }

  sendUpdate() {
    this.store.dispatch(
      broadcastSendAction({
        actionType: 'UPDATE_FROM_TAB_A',
        payload: { message: 'Ciao da Tab A!', timestamp: new Date() }
      })
    );
  }

  addRowA() {
    const row = { id: Date.now(), name: `Item ${Date.now()}` };
    this.rowDataResultSet = [...this.rowDataResultSet, row];
    this.store.dispatch(broadcastSendAction({ actionType: 'ADD_ROW', payload: row }));
  }
}