import { Component } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.css']
})
export class QuoteDialogComponent {

  constructor(
    private feature: Feature,
    public dialogRef: MdDialogRef<QuoteDialogComponent>
  ) { }

}
