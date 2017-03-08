import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SeeyondService } from '../_services/seeyond.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {MdDialog, MdDialogConfig, MdDialogRef} from '@angular/material';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';
import { Feature } from '../feature';
import {User} from "../_models/user";
import {AlertService} from "../_services/alert.service";
import {LoadSeeyondsDialogComponent} from "../load-seeyonds-dialog/load-seeyonds-dialog.component";

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
  }

  createXmlHref() {
    var content = this.feature.xml;
    var blob = new Blob([ content ], { type : 'application/xml' });
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL( blob ));
  }

  saveFeature() {
    var result;

    if (this.feature.id == null)
      result = this.seeyond.saveFeature();
    else result = this.seeyond.updateFeature();

    result.subscribe(feature => {
      this.alert.success("Successfully saved feature");
      this.feature = feature;
    });
  }

  loadFeature() {
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
    let config = new MdDialogConfig();
    config.width = '500px';
    let dialogRef = this.dialog.open(QuoteDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'confirm') {
        this.quoteConfirmed();
      }
    });
  }

  quoteConfirmed() {
    console.log('quote was confirmed');
    // mark the design as quoted and save
    this.feature.quoted = true;
    // send seeyond design email

    // navigate to the url with the id, (if we aren't already there?)
  }

}
