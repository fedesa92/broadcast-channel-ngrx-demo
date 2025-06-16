import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IndexedDbService } from './indexed-db.service';
import { Subject, merge } from 'rxjs';
import { debounceTime, throttleTime, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SaveStateService {
  private urgentSave$ = new Subject<void>();
  private regularSave$ = new Subject<void>();

  constructor(
    private store: Store<{ myState: any }>,
    private indexedDb: IndexedDbService
  ) {
    const debouncedSave$ = this.regularSave$.pipe(debounceTime(2000));
    const throttledUrgentSave$ = this.urgentSave$.pipe(throttleTime(1000));

    merge(debouncedSave$, throttledUrgentSave$)
      .pipe(
        switchMap(() => this.store.select('myState').pipe(take(1))),
        switchMap((state) => this.indexedDb.set('app-state', state))
      )
      .subscribe();
  }

  requestRegularSave() {
    this.regularSave$.next();
  }

  requestUrgentSave() {
    this.urgentSave$.next();
  }

  saveNow() {
    this.store
      .select('myState')
      .pipe(take(1))
      .subscribe((state) => this.indexedDb.set('app-state', state));
  }
}