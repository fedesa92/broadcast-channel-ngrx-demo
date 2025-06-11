import { Component } from "@angular/core";
import { increment, reset } from "./test-broadcast-and-ng-rx.actions";
import { Store } from "@ngrx/store";
import { AsyncPipe, CommonModule } from "@angular/common";
import { AppState } from "./test-broadcast-and-ng-rx.reducer";
import { Observable } from "rxjs/internal/Observable";
import { selectCounter } from "./test-broadcast-and-ng-rx.selector";

@Component({ 
    standalone: true,
    imports: [AsyncPipe, CommonModule],
    selector: 'app-test-broadcast-and-ng-rx', 
    template: `
    <div>
        <h1>{{ counter$ | async }}</h1>
        <button (click)="inc()">Increment</button>
        <button (click)="reset()">Reset</button>
    </div>
    ` 
})
export class CounterComponent {
  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = new Observable<number>();
    this.counter$ = this.store.select(selectCounter);
  }
  
  inc() { this.store.dispatch(increment({ source: 'local' })); }
  reset() { this.store.dispatch(reset({ source: 'local' })); }
}