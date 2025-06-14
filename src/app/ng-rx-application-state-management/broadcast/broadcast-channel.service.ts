import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface BroadcastEvent {
  type: string;
  payload?: any;
  sourceTabId: string;
}

@Injectable({ providedIn: 'root' })
export class BroadcastChannelService implements OnDestroy {
  private channel: BroadcastChannel;
  private events$ = new Subject<BroadcastEvent>();
  private readonly tabId = this.generateTabId();

  constructor() {
    this.channel = new BroadcastChannel('ngrx-broadcast-channel');
    this.channel.onmessage = (event: MessageEvent) => {
      const data = event.data as BroadcastEvent;
      if (data.sourceTabId !== this.tabId) {
        this.events$.next(data);
      }
    };
  }

  send(event: Omit<BroadcastEvent, 'sourceTabId'>) {
    this.channel.postMessage({ ...event, sourceTabId: this.tabId });
  }

  onMessage(): Observable<BroadcastEvent> {
    return this.events$.asObservable();
  }

  ngOnDestroy() {
    this.channel.close();
  }

  private generateTabId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}