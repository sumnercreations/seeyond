import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { Feature } from './feature';
import { User } from './_models/user';
import { SeeyondService } from './_services/seeyond.service';
import { AlertService } from './_services/alert.service';

@Component({
  selector: 'seeyond-seeyond',
  templateUrl: './seeyond.component.html',
  styleUrls: ['./seeyond.component.css'],
})
export class SeeyondComponent implements OnInit {
  private selectedFeature: any;

  constructor(
    private route: ActivatedRoute,
    private feature: Feature,
    private router: Router,
    private user: User,
    private seeyond: SeeyondService,
    private alert: AlertService
  ) {
    // initialize the feature based on the URL path.
    router.events.subscribe((event) => {
      this.route.params.subscribe(params => {
        if(event instanceof NavigationEnd) {
          // feature - default values
          this.selectedFeature = params['feature'];

          if(!Number(this.selectedFeature)) {
            switch (this.selectedFeature) {
              case "linear-partition":
                this.feature.title = 'linear-partition';
                this.feature.updateFeature(0);
                break;

              case "curved-partition":
                this.feature.updateFeature(1);
                break;

              case "wall":
                this.feature.updateFeature(2);
                break;

              case "wall-to-ceiling":
                this.feature.updateFeature(3);
                break;

              case "ceiling":
                this.feature.updateFeature(4);
                break;

              default:
                // default to the wall if they pass something we don't support.
                this.router.navigate(['/feature', 'wall']);
                break;
            }
          }else if(Number(this.selectedFeature)) {
            this.seeyond.loadFeature(this.selectedFeature).subscribe(
              feature => {
                // if feature was found and is not archived
                if(feature != null && !feature.archived) {
                  this.feature.loadFeature(feature);
                }else{
                  // redirect to default wall feature
                  this.router.navigate(['/feature', 'wall']);
                }
              },
              error => {
                if(error) {
                  this.alert.apiAlert(error);
                }
              }
            );
          }
        }
      });
    });

    // Check for a logged in user.
    let seeyondUser = localStorage.getItem('seeyondUser');
    if(seeyondUser) {
      // set up the user values
      var parsedUser = JSON.parse(seeyondUser);
      this.user.uid = parsedUser.uid;
      this.user.email = parsedUser.email;
      this.user.firstname = parsedUser.firstname;
      this.user.lastname = parsedUser.lastname;
    }else{
      // create a new empty user
      this.user = new User;
    }
  }

  ngOnInit() {
  }

}
