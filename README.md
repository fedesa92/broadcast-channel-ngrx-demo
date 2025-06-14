# Broadcast Channel NgRx Demo

Demo di sincronizzazione di azioni NgRx tra più tab del browser usando `BroadcastChannel`.

---

## Struttura del progetto

```
/src
  /app
    /components
      tab-a.component.ts
      tab-b.component.ts
    /services
      broadcast.service.ts
    /store
      broadcast.actions.ts
      broadcast.effects.ts
      selectors.ts
      tuo-reducer.ts
    /tabs
      tabs.module.ts
      tabs-routing.module.ts
    app.module.ts
    app-routing.module.ts
    app.component.ts
    app.component.html
  main.ts
  index.html
.gitignore
package.json
tsconfig.json
angular.json
README.md
```

---

## Come funziona

- Ogni tab usa un `BroadcastService` per inviare e ricevere azioni NgRx attraverso il canale `BroadcastChannel`.
- Gli effetti NgRx intercettano azioni da inviare e le trasmettono ad altri tab.
- Gli altri tab ricevono le azioni tramite un effetto che ascolta `BroadcastService`.
- I componenti `TabAComponent` e `TabBComponent` sono pagine distinte con routing dedicato, che possono inviare azioni e mostrarle.

---

## Come usare

1. Clona il repo e installa le dipendenze:

```bash
git clone https://github.com/fedesa92/broadcast-channel-ngrx-demo.git
cd broadcast-channel-ngrx-demo
npm install
```

2. Avvia il progetto:

```bash
ng serve
```

3. Apri due tab del browser con:

- http://localhost:4200/tab-a
- http://localhost:4200/tab-b

4. Usa i pulsanti "Invia Update" in ciascuna tab per inviare azioni sincronizzate tramite BroadcastChannel.

---

## Come estendere

- Aggiungi nuovi tipi di azioni personalizzate.
- Migliora il reducer per gestire azioni ricevute.
- Integra con altre funzionalità NgRx.

---

## Dipendenze principali

- Angular 15+
- NgRx Store, Effects
- BroadcastChannel API (browser moderno)

---

## License

MIT License