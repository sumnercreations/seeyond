import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SeeyondService } from '../_services/seeyond.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { Feature } from '../feature';
import { User } from "../_models/user";
import { AlertService } from "../_services/alert.service";
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';
import { LoadSeeyondsDialogComponent } from "../load-seeyonds-dialog/load-seeyonds-dialog.component";
import { SaveSeeyondDialogComponent } from "../save-seeyond-dialog/save-seeyond-dialog.component";

@Component({
  selector: 'seeyond-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    private seeyond: SeeyondService,
    private feature: Feature,
    private sanitizer: DomSanitizer,
    public router: Router,
    public dialog: MdDialog,
    private user: User,
    private alert: AlertService
  ) { }

  ngOnInit() {
    // Do we even need to do this?
    // subscribe to the saved event to close the save dialog
    // subscribe to the loaded event to close the load dialog
  }

  createXmlHref() {
    var content = this.feature.xml;
    var blob = new Blob([ content ], { type : 'application/xml' });
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL( blob ));
  }

  saveFeatureDialog() {
    var dialogRef = this.dialog.open(SaveSeeyondDialogComponent, new MdDialogConfig);
  }

  myFeaturesDialog() {
    this.seeyond.getMyFeatures().subscribe(features => {
      if (features.length) {
        var dialogRef = this.dialog.open(LoadSeeyondsDialogComponent, new MdDialogConfig);
        dialogRef.componentInstance.seeyonds = features;
      }
    });

    // let serviceResponse = this.seeyond.loadFeature(id).subscribe((res: Response) => {
    //   let loadedFeature = res.json();
    //   console.log(loadedFeature);
    //   this.router.navigate(['/feature', loadedFeature.name, loadedFeature.id]);
    // });
  }

  downloadImages() {
    console.log('downloading the images');
    // let facing = this.feature.syd_v.QT.TakeSnapshot(0, 0, 0);
    // let profile = this.feature.syd_v.QT.TakeSnapshot(45, 0, 0);
  }

  getQuote() {
    // load the dialog to confirm the design we will be sending
    var config = new MdDialogConfig();
    config.width = '500px';
    var dialogRef = this.dialog.open(QuoteDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'confirm') {
        this.quoteConfirmed();
      }
    });
  }

  quoteConfirmed() {
    // mark the design as quoted and save
    this.alert.success("Your quote request has been sent.");
    this.feature.quoted = true;
    // send seeyond design email

    // navigate to the url with the id, (if we aren't already there?)
  }

}
