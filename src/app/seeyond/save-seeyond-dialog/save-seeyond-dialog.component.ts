import { Component, OnInit } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Feature } from '../feature';
import { AlertService } from "../_services/alert.service";
import { SeeyondService } from '../_services/seeyond.service';

@Component({
  selector: 'seeyond-save-seeyond-dialog',
  templateUrl: './save-seeyond-dialog.component.html',
  styleUrls: ['./save-seeyond-dialog.component.css']
})
export class SaveSeeyondDialogComponent {
  public newDesign: boolean;

  constructor(
    private dialogRef: MdDialogRef<SaveSeeyondDialogComponent>,
    private router: Router,
    private feature: Feature,
    private alert: AlertService,
    private seeyond: SeeyondService
  ) { }

  ngOnInit() {
    // if the design already has an ID then it's not new.
    this.newDesign = this.feature.id ? false : true;
  }

  saveFeature() {
    this.dialogRef.afterClosed().subscribe(button => {
      if(button == 'saveNew') {
        this.newDesign = true;
      }
    })
    console.log(this.feature.design_name);
    console.log("Feature ID: " + this.feature.id);
    console.log("New Design: " + this.newDesign);
    if (this.newDesign) {
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
        console.log("####################");
        console.log(this.router.url);
        console.log(url);
        console.log("####################");
      });
    }
  }

  saveNew() {
    console.log("+++++ Saving New ++++++");
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
