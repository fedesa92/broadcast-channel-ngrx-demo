import { Component, OnInit, HostListener } from '@angular/core';
import { SaveStateService } from '../save-state.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-my-grid',
  templateUrl: './my-grid.component.html',
})
export class MyGridComponent implements OnInit {
  rowData: any[] = [];
  columnDefs = [
    { field: 'id', sortable: true, filter: true },
    { field: 'name', sortable: true, filter: true },
  ];

  constructor(
    private saveStateService: SaveStateService,
    private store: Store<{ myState: any }>
  ) {}

  ngOnInit() {
    this.store.select('myState').subscribe((state) => {
      this.rowData = state.rows || [];
    });

    // Request a regular save initially (if needed)
    this.saveStateService.requestRegularSave();
  }

  onFilterChanged() {
    this.saveStateService.requestUrgentSave();
  }

  onPaginationChanged() {
    this.saveStateService.requestUrgentSave();
  }

  onRowDragEnd() {
    this.saveStateService.requestUrgentSave();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload() {
    this.saveStateService.saveNow();
  }
}