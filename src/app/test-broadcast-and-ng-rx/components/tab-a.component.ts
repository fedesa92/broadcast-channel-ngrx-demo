import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { selectLastBroadcastAction } from 'src/app/test-broadcast-and-ng-rx/test-broadcast-and-ng-rx.selector';
import { CommonModule } from '@angular/common';
import { broadcastSendAction } from '../test-broadcast-and-ng-rx.actions';

@Component({
  selector: 'app-tab-a',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Tab A</h2>
    <button (click)="sendUpdate()">Invia Update</button>
    <div *ngIf="lastAction !== null">
      <h4>Azione ricevuta:</h4>
      <pre>{{ lastAction | json }}</pre>
    </div>
  `
})
export class TabAComponent implements OnInit {
  lastAction: any | null;

  constructor(private store: Store, private _cdr: ChangeDetectorRef) {
    this.lastAction = null;
  }

  ngOnInit(): void {
    this.store.select(selectLastBroadcastAction).pipe(
      filter((filteredValue: any) => filteredValue !== undefined)
    ).subscribe(value => {
      console.log('TabB received:', value);
      this.lastAction = value;
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
}