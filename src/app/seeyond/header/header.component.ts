import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Feature } from '../feature';

var packageJSON = require('../../../../package.json');

@Component({
  selector: 'seeyond-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private feature: Feature,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  public showAppInfo()
  {
    let dialogRef = this.dialog.open(SeeyondInfoDialog);
  }

  public loginDialog()
  {
    let config = new MdDialogConfig();
    config.width = '300px';
    let dialogRef = this.dialog.open(LoginDialogComponent, config);
  }

}

//     _       ____                ___       __
//    (_)___  / __/___        ____/ (_)___ _/ /___  ____ _
//   / / __ \/ /_/ __ \______/ __  / / __ `/ / __ \/ __ `/
//  / / / / / __/ /_/ /_____/ /_/ / / /_/ / / /_/ / /_/ /
// /_/_/ /_/_/  \____/      \__,_/_/\__,_/_/\____/\__, /
//                                               /____/
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
