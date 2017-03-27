import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Feature } from '../feature';
import { User } from "../_models/user";
import { AlertService } from "../_services/alert.service";
import { SeeyondService } from '../_services/seeyond.service';

@Component({
  selector: 'seeyond-save-seeyond-dialog',
  templateUrl: './save-seeyond-dialog.component.html',
  styleUrls: ['./save-seeyond-dialog.component.css']
})
export class SaveSeeyondDialogComponent {
  public newDesign: boolean;
  public newButton: boolean = false;

  constructor(
    private dialogRef: MdDialogRef<SaveSeeyondDialogComponent>,
    private router: Router,
    private alert: AlertService,
    private seeyond: SeeyondService,
    public feature: Feature,
    public user: User
  ) { }

  ngOnInit() {
    // if the design already has an ID then it's not new.
    this.newDesign = this.feature.id ? false : true;
  }

  newButtonClick() {
    this.newButton = true;
  }

  saveFeature() {
    if (this.newDesign || this.newButton) {
      this.saveNew();
    }else{
      this.seeyond.updateFeature().subscribe(feature => {
        // notify the user that we saved their design
        this.alert.success("Successfully saved your design");
        // set the feature up according to what is returned from the API after save.
        this.feature = feature.seeyond;
        // navigate if the current path isn't already right
        var url = this.router.createUrlTree(['/feature', this.feature.id]).toString();
        if(url != this.router.url) {
          this.router.navigate(['/feature', this.feature.id]);
        }
      });
    }
  }

  saveNew() {
    // reset some values for the new quote
    this.feature.quoted = false;
    this.feature.project_name = null;
    this.feature.specifier = null;
    this.seeyond.saveFeature().subscribe(feature => {
      // notify the user that we saved their design
      this.alert.success("Successfully saved your design");
      // set the feature up according to what is returned from the API after save.
      this.feature = feature.seeyond;
      // redirect to the new design
      this.router.navigate(['/feature', this.feature.id]);
    });
  }

}
