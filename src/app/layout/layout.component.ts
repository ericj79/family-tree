import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddMemoryComponent } from '../add-memory/add-memory.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(
    private dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(AddMemoryComponent);
  }
}
