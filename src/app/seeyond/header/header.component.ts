import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
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

  public showAppInfo()
  {
    console.log('showing seeyond info');
    let dialogRef = this.dialog.open(SeeyondInfoDialog);
  }

  public loginDialog()
  {
    console.log('showing login dialog');
    let config = new MdDialogConfig();
    config.width = '500';
    config.height = '500';
    let dialogRef = this.dialog.open(SeeyondLoginDialog, config);
  }

}

@Component({
  selector: 'seeyond-info-dialog',
  templateUrl: './seeyond-info-dialog.html',
  styles: [
    ".versions-container { width: 300px; }"
  ]
})
export class SeeyondInfoDialog {
  appVersion = '';
  tessellationVersion = '';
  visualizationVersion = '';
  constructor(public dialogRef: MdDialogRef<SeeyondInfoDialog>) {
    this.appVersion = packageJSON.version;
    this.tessellationVersion = packageJSON.dependencies['syd-tessellation'];
    this.visualizationVersion = packageJSON.dependencies['syd-visualization'];
  }
}


@Component({
  selector: 'seeyond-login-dialog',
  templateUrl: './seeyond-login-dialog.html',
})
export class SeeyondLoginDialog {
  constructor(public dialogRef: MdDialogRef<SeeyondLoginDialog>) {

  }
}
