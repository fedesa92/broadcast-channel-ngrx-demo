import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

interface AppDB {
  'app-state': any;
}

@Injectable({ providedIn: 'root' })
export class IndexedDbService {
  private dbPromise: Promise<IDBPDatabase<AppDB>>;

  constructor() {
    this.dbPromise = openDB<AppDB>('my-app-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('keyval')) {
          db.createObjectStore('keyval');
        }
      },
    });
  }

  async set(key: string, val: any): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('keyval', 'readwrite');
    await tx.objectStore('keyval').put(val, key);
    await tx.done;
  }

  async get(key: string): Promise<any | undefined> {
    const db = await this.dbPromise;
    return db.transaction('keyval').objectStore('keyval').get(key);
  }

  async delete(key: string): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('keyval', 'readwrite');
    await tx.objectStore('keyval').delete(key);
    await tx.done;
  }
}