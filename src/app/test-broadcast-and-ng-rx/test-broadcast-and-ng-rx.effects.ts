import { Injectable } from "@angular/core";
import { BroadcastChannelService } from "../broadcast-channel/broadcast-channel.service";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from "rxjs/operators";
import { increment, reset } from "./test-broadcast-and-ng-rx.actions";

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

  constructor(
    private actions$: Actions,
    private bcService: BroadcastChannelService
  ) {}
}