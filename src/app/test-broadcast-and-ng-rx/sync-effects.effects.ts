import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { increment, reset } from "./test-broadcast-and-ng-rx.actions";
import { filter, tap } from "rxjs/operators";
import { BroadcastChannelService } from "../broadcast-channel/broadcast-channel.service";

@Injectable()
export class SyncEffects {
  sync$ = createEffect(() =>
    this.actions$.pipe(
      ofType(increment, reset),
      filter(action => action.source !== 'broadcast'), // 👈 evita loop
      tap(action => {
          console.log('SyncEffects broadcasting:', action);
          this.bcService.broadcast({ ...action, source: 'broadcast' });
        })
    ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private bcService: BroadcastChannelService) {}
}