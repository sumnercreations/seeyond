import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';

@Component({
  selector: 'seeyond-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.css']
})
export class ConfirmDeleteDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<ConfirmDeleteDialogComponent>
  ) { }

}
