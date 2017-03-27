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
  appVersion = '';
  tessellationVersion = '';
  visualizationVersion = '';

  constructor(
    private loginService: LoginService,
    public feature: Feature,
    public user: User,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    // log the versions for future debugging purposes
    this.appVersion = packageJSON.version;
    this.tessellationVersion = packageJSON.dependencies['syd-tessellation'];
    this.visualizationVersion = packageJSON.dependencies['syd-visualization'];
    console.log("Seeyond: " + this.appVersion);
    console.log("Syd-Tessellation: " + this.tessellationVersion);
    console.log("Syd-Visualization: " + this.visualizationVersion);

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
