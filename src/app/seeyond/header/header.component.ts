import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LoginService } from '../_services/login.service';
import { Feature } from '../feature';
import { User } from '../_models/user';

var packageJSON = require('../../../../package.json');

@Component({
  selector: 'seeyond-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginDialogRef: MdDialogRef<any>;

  constructor(
    private loginService: LoginService,
    private feature: Feature,
    private user: User,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    // subscribe to the login event
    this.loginService.onUserLoggedIn.subscribe(
      data => {
        // this.user = data;
        this.user.uid = data.uid;
        this.user.email = data.email;
        this.user.firstname = data.firstname;
        this.user.lastname = data.lastname;

        // close the dialog
        this.loginDialogRef.close();
      }
    );
  }

  public showAppInfo() {
    this.dialog.open(SeeyondInfoDialog);
  }

  public loginDialog() {
    let config = new MdDialogConfig();
    config.width = '300px';
    this.loginDialogRef = this.dialog.open(LoginDialogComponent, config);
  }

  public logout() {
    this.loginService.logout();
    this.user = new User;
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
