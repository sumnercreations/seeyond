import {Component, Input} from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-load-seeyonds-dialog',
  templateUrl: 'load-seeyonds-dialog.component.html',
  styleUrls: ['load-seeyonds-dialog.component.css']
})
export class LoadSeeyondsDialogComponent {

  public seeyonds: Array<Feature>;

  constructor(private dialogRef: MdDialogRef<LoadSeeyondsDialogComponent>) {
  }

}
