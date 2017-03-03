import { Component } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { LoginService } from '../login.service';

@Component({
  selector: 'seeyond-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  constructor(
    private loginService: LoginService,
    public dialogRef: MdDialogRef<LoginDialogComponent>
  ) { }

}
