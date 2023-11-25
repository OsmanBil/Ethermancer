import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TermsComponent } from '../terms/terms.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  openTermsDialog(): void {
    this.dialog.open(TermsComponent, {
      width: '500px', 
    });
  }
}
