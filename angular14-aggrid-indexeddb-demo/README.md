# Angular 14 + AG Grid + IndexedDB Demo

## Descrizione

Questo progetto è un esempio minimal di un’app Angular 14 che usa:

- **AG Grid** per la tabella con funzionalità di filtro, paginazione e drag and drop.
- **NgRx Store** per mantenere lo stato dell’applicazione (qui la lista di righe).
- **IndexedDB** (tramite la libreria `idb`) per salvare lo stato localmente e sincronizzarlo tra più tab.
- Un sistema di salvataggio debounced e throttled per ottimizzare gli accessi a IndexedDB.
- Ricaricamento dello stato salvato da IndexedDB all’avvio tramite `APP_INITIALIZER`.

---

## Struttura principale

- `src/app/indexed-db.service.ts`: servizio wrapper per interagire con IndexedDB tramite `idb`.
- `src/app/save-state.service.ts`: servizio che ascolta le richieste di salvataggio e salva lo stato con debounce (2s) e throttle (1s).
- `src/app/store/reducer.ts`: un reducer NgRx minimale per gestire lo stato della tabella.
- `src/app/my-grid/my-grid.component.ts` e `.html`: componente con AG Grid che gestisce eventi per triggerare i salvataggi.
- `src/app/app.module.ts`: setup del modulo con NgRx Store, IndexedDB, e `APP_INITIALIZER` per caricare lo stato all’avvio.

---

## Come funziona

### Persistenza con IndexedDB

- Lo stato della tabella (`rows`) viene salvato su IndexedDB usando la chiave `'app-state'`.
- `SaveStateService` espone metodi per richiedere salvataggi “urgenti” (es. filtro, drag end) o “regolari” (salvataggi meno frequenti).
- I salvataggi sono **debounced** di 2 secondi e **throttled** a 1 secondo per non sovraccaricare IndexedDB.
- Prima che la pagina si chiuda (`beforeunload`) viene forzato un salvataggio immediato.

### Caricamento dello stato

- Al bootstrap dell’app Angular, `APP_INITIALIZER` carica lo stato da IndexedDB e lo mette nello store tramite una action.
- Se non c’è stato salvato, si parte da uno stato vuoto.

### AG Grid

- Tabella con colonne `id` e `name`.
- Supporta filtro, paginazione (pagina da 10 righe), e drag and drop righe.
- Gli eventi principali (filtro cambiato, pagina cambiata, drag finito) notificano `SaveStateService` per salvare.

---

## Come avviare il progetto

1. Estrarre l’archivio zip.
2. Aprire terminale nella cartella estratta.
3. Eseguire:

```bash
npm install
ng serve
```
4. Aprire il browser su http://localhost:4200.
5. Modifica tabella, prova filtro/pagina/drag, ricarica la pagina o apri un’altra tab per vedere la sincronizzazione.

Implementazioni da estendere

1. Aggiungere ulteriori colonne AG Grid e gestire i relativi eventi per salvarne lo stato.

2. Integrare altre feature NgRx come effetti, selettori, e azioni.

3. Personalizzare la logica di salvataggio (ad es. salvare solo parti dello stato).

4. Migliorare la UI e gestire errori di IndexedDB.