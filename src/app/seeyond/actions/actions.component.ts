import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { SeeyondService } from '../seeyond.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { QuoteDialogComponent } from '../quote-dialog/quote-dialog.component';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(
    private service: SeeyondService,
    private feature: Feature,
    private sanitizer: DomSanitizer,
    public router: Router,
    public dialog: MdDialog,
  ) { }

  ngOnInit() {
  }

  createXmlHref() {
    var content = this.feature.xml;
    var blob = new Blob([ content ], { type : 'application/xml' });
    return this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL( blob ));
  }

  saveFeature(id: number, uid: number) {
    console.log('saving feature: ' + id);
    this.service.updateFeature(id, uid);
  }

  loadFeature(id: number) {
    console.log('loading feature: ' + id);
    let serviceResponse = this.service.loadFeature(id).subscribe((res: Response) => {
      let loadedFeature = res.json();
      console.log(loadedFeature);
      this.router.navigate(['/feature', loadedFeature.name, loadedFeature.id]);
    });
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
    this.feature.quoted = 1;
    // send seeyond design email

    // navigate to the url with the id, (if we aren't already there?)
  }

}
