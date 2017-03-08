import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { LoginService } from '../_services/login.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'seeyond-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {
  private email: string;
  private password: string;
  public loading: boolean = false;

  constructor(
    private auth: LoginService,
    private alert: AlertService,
    public dialogRef: MdDialogRef<LoginDialogComponent>
  ) { }

  login() {
    console.log(this.email);
    console.log(this.password);
    this.loading = true;
    this.auth.login(this.email, this.password)
      .subscribe(
        data => {
          console.log("data");
          console.log(data)
          this.alert.success("Successfully logged in.");
        },
        error => {
          console.log("Error");
          console.log(error);
          if(error) {
            this.alert.apiAlert(error);
          }
          this.loading = false;
        }
      );
  }

}
