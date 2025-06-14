import { Injectable } from "@angular/core";
import { BroadcastChannelService } from "../broadcast-channel/broadcast-channel.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from "rxjs/operators";
import { increment, reset } from "./test-broadcast-and-ng-rx.actions";
import * as BroadcastActions from './test-broadcast-and-ng-rx.actions';
import { BroadcastService } from "./broadcast.service";

@Injectable()
export class CounterEffects {
  syncActions$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, reset),
        tap((action) => this.bcService.broadcast({ ...action, source: 'broadcast' }))
      ),
    { dispatch: false }
  );

  send$ = createEffect(() =>
      this.actions$.pipe(
        ofType(BroadcastActions.broadcastSendAction),
        tap(({ actionType, payload }) => {
          this.broadcastService.send({ type: actionType, payload });
        })
      ),
      { dispatch: false }
    );
  
    receive$ = createEffect(() =>
      this.broadcastService.onMessage().pipe(
        map(({ type, payload }) =>
          BroadcastActions.broadcastReceivedAction({ actionType: type, payload })
        )
      )
    );

  constructor(
    private actions$: Actions,
    private bcService: BroadcastChannelService,
    private broadcastService: BroadcastService
  ) {}
}