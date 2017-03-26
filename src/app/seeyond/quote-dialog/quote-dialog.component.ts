import { Component } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Feature } from '../feature';
import { AlertService } from "../_services/alert.service";
import { SeeyondService } from '../_services/seeyond.service';

@Component({
  selector: 'seeyond-quote-dialog',
  templateUrl: './quote-dialog.component.html',
  styleUrls: ['./quote-dialog.component.css']
})
export class QuoteDialogComponent {

  constructor(
    private seeyond: SeeyondService,
    private alert: AlertService,
    private router: Router,
    public dialogRef: MdDialogRef<QuoteDialogComponent>,
    public feature: Feature
  ) { }

  quoteConfirmed() {
    // Save the hardare to a database with IDs and quantities
    // We shouldn't send this as a separate request, instead the
    // hardware should be sent as part of the feature and then
    // the API can save the hardware to the seeyond_hw_parts table.
    // This way we can ensure that we have the correct seeyond ID.
    console.log(this.feature.hardware);
    // mark the design as quoted and save
    // if(this.feature.id) {
    //   this.feature.quoted = true;
    //   this.seeyond.updateFeature().subscribe(feature => {
    //     // send seeyond design email after we have saved.
    //     this.seeyond.sendEmail().subscribe(response => {
    //       console.log(response);
    //     });
    //     // redirect to the new URL if we aren't already there.
    //     var url = this.router.createUrlTree(['/feature', this.feature.id]).toString();
    //     if(url != this.router.url) {
    //       this.router.navigate(['/feature', this.feature.id]);
    //     }
    //     this.alert.success("Your quote request has been sent.");
    //   });
    // } else {
    //   // set the design name to something simple
    //   this.feature.design_name = this.feature.title + ' - ' +  this.getToday();
    //   this.feature.quoted = true;
    //   this.seeyond.saveFeature().subscribe(feature => {
    //     // send seeyond design email after we have saved.
    //     this.seeyond.sendEmail().subscribe(response => {
    //       console.log(response);
    //     });
    //     // redirect to the URL of the saved design.
    //     this.alert.success("We saved your design so we can quote it and you can load it later.");
    //     this.feature = feature.seeyond;
    //     this.router.navigate(['/feature', this.feature.id]);
    //   });
    // }
  }

  getToday() {
    var today = new Date();
    var todayString: string;
    var dd: any = today.getDate();
    var mm: any = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    todayString = mm+'/'+dd+'/'+yyyy;
    return todayString;
  }
}
