import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BroadcastChannelService implements OnDestroy {
  private readonly broadcastChannel: BroadcastChannel;

  constructor(private store: Store) {
    this.broadcastChannel =  new BroadcastChannel('counter_channel');
    this.broadcastChannel.onmessage = (event: MessageEvent) => {
      const action = event.data;
      if (action?.type) {
        console.log('[BroadcastChannel] Received action:', action);
        this.store.dispatch(action);

        //nel caso chiamare -->  broadcast(action: Action)
      }
    };
  }


  broadcast(action: { source: string; type: "[Counter] Increment"; } 
                  | { source: string; type: "[Counter] Reset"; }) {
    console.log('[BroadcastChannel] Sending action:', action);
    this.broadcastChannel.postMessage(action);
  }

  ngOnDestroy() {
    this.broadcastChannel.close();
  }
}
