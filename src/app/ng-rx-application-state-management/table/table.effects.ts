import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { addRow, removeRow } from "./table.actions";
import { filter, map, tap } from "rxjs";
import { broadcastSendAction } from "src/app/ng-rx-application-state-management/broadcast/broadcast.actions";

@Injectable()
export class TableEffects {
  constructor(private actions$: Actions, private store: Store) {}

  addRow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRow),
      filter(({ sendThroughBroadcast }) => !sendThroughBroadcast), 
      map(({ row }) =>
        broadcastSendAction({ actionType: 'ADD_ROW', payload: row })
      )
    )
  );

  removeRow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeRow),
      filter(({ sendThroughBroadcast }) => !sendThroughBroadcast), 
      map(({ id }) =>
        broadcastSendAction({ actionType: 'REMOVE_ROW', payload: { id } })
      )
    )
  );
}
