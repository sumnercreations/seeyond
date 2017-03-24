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
  saveDialogRef: MdDialogRef<any>;
  loadDialogRef: MdDialogRef<any>;

  constructor(
    private seeyond: SeeyondService,
    private sanitizer: DomSanitizer,
    private alert: AlertService,
    public router: Router,
    public dialog: MdDialog,
    public user: User,
    public feature: Feature
  ) { }

  ngOnInit() {
    // subscribe to the saved event to close the save dialog
    this.seeyond.onSaved.subscribe(success => {
      this.saveDialogRef? this.saveDialogRef.close() : null;
    });
    // subscribe to the loaded event to close the load dialog
    this.seeyond.onLoaded.subscribe(success => {
      this.loadDialogRef? this.loadDialogRef.close() : null;
    });
  }

  createXmlHref() {
    var content = this.feature.xml;
    var blob = new Blob([ content ], { type : 'application/xml' });
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL( blob ));
  }

  saveFeatureDialog() {
    this.saveDialogRef = this.dialog.open(SaveSeeyondDialogComponent, new MdDialogConfig);
  }

  myFeaturesDialog() {
    this.seeyond.getMyFeatures().subscribe(features => {
      this.loadDialogRef = this.dialog.open(LoadSeeyondsDialogComponent, new MdDialogConfig);
      this.loadDialogRef.componentInstance.seeyonds = features;
    });
  }

  downloadImages() {
    var profile = this.feature.syd_v.QT.Visualization.TakeSnapshot(45);
    var facing  = this.feature.syd_v.QT.Visualization.TakeSnapshot(0);
    var filename = this.feature.name + ".zip";
    var FileSaver = require('file-saver');
    var JSZip = require("jszip");
    var zip = new JSZip();

    profile = profile.replace(/^data:image\/(png|jpg);base64,/, '');
    facing = facing.replace(/^data:image\/(png|jpg);base64,/, '');
    zip.file("profile.png", profile, {base64: true});
    zip.file("facing.png", facing, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function (blob) {
        FileSaver.saveAs(blob, filename);
    });
  }

  getQuote() {
    // load the dialog to confirm the design we will be sending
    var config = new MdDialogConfig();
    config.width = '500px';
    var dialogRef = this.dialog.open(QuoteDialogComponent, config);
  }

}
