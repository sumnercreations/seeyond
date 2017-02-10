import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Feature } from '../feature';

var packageJSON = require('../../../../package.json');

@Component({
  selector: 'seeyond-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private feature: Feature, public dialog: MdDialog) { }

  ngOnInit() {
  }

  showAppInfo()
  {
    console.log('showing app info');
    let dialogRef = this.dialog.open(AppInfoDialog);
  }

}

@Component({
  selector: 'seeyond-info-dialog',
  templateUrl: './app-info-dialog.html',
  styles: [
    ".versions-container { width: 300px; }"
  ]
})
export class AppInfoDialog {
  appVersion = '';
  tessellationVersion = '';
  visualizationVersion = '';
  constructor(public dialogRef: MdDialogRef<AppInfoDialog>) {
    console.log(packageJSON);
    this.appVersion = packageJSON.version;
    this.tessellationVersion = packageJSON.dependencies['syd-tessellation'];
    this.visualizationVersion = packageJSON.dependencies['syd-visualization'];
  }
}
