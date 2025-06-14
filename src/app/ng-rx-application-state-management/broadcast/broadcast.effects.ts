import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap } from "rxjs/operators";
import * as BroadcastActions from './broadcast.actions';
import { BroadcastChannelService } from "./broadcast-channel.service";
import { addRow, removeRow } from "../table/table.actions";

@Injectable()
export class BroadcastEffects {
  send$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BroadcastActions.broadcastSendAction),
      tap(({ actionType, payload }) => {
        this.broadcastChannelService.send({ type: actionType, payload });
      })
    ),
    { dispatch: false }
  );

  receive$ = createEffect(() =>
    this.broadcastChannelService.onMessage().pipe(
      map(({ type, payload }) =>
        BroadcastActions.broadcastReceivedAction({ actionType: type, payload })
      )
    )
  );
  
  //se riceve da broadcast sendThroughBroadcast: true cosi non generiamo loop infinito
  sendTableUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BroadcastActions.broadcastSendAction),
      filter(({ actionType }) => actionType === 'ADD_ROW' || actionType === 'REMOVE_ROW'),
      map(({ actionType, payload }) => {
        if (actionType === 'ADD_ROW') {
          return addRow({ row: payload, sendThroughBroadcast: true });
        } else {
          return removeRow({ id: payload.id, sendThroughBroadcast: true });
        }
      })
    ),
  );
    
  constructor(
    private actions$: Actions,
    private broadcastChannelService: BroadcastChannelService
  ) { }
}