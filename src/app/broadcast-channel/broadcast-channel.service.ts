import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Action, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class BroadcastChannelService implements OnDestroy {
  private readonly broadcastChannel: BroadcastChannel;

  constructor(private store: Store, private ngZone: NgZone) {
    this.broadcastChannel =  new BroadcastChannel('counter_channel');
    this.broadcastChannel.onmessage = (event: MessageEvent) => {
      const action = event.data;
      if (action?.type && action.source !== 'broadcast') {
        const withSource = { ...action, source: 'broadcast' };
        console.log('[BroadcastChannel] Received action:', action);

        // Avvolge nel contesto di Angular
        this.ngZone.run(() => {
          this.store.dispatch(withSource);
        });
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
