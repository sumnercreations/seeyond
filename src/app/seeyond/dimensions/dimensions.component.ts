import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { Feature } from '../feature';

@Component({
  selector: 'seeyond-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.css']
})
export class DimensionsComponent implements OnInit {

  constructor(
    private alert: AlertService,
    public router: Router,
    public feature: Feature
  ) { }

  ngOnInit() {
  }

  public updateSelectedFeature(name: string) {
    this.router.navigate(['/feature', name]);
  }

  public updateFeatureMeasurement(measurement: number, name: string) {
    switch (name) {
      case "width":
        if(measurement < 50) {
          this.feature.width = 50;
          this.alert.error('The minimum width is 50 inches');
        } else if((this.feature.feature_type == 0 || this.feature.feature_type == 1) && measurement > 240) {
          this.feature.width = 240;
          this.alert.error('The maximum width for partitions is 240 inches');
        }else if(measurement > 480) {
          this.feature.width = 480;
          this.alert.error('The maximum width for walls and ceilings is 480 inches');
        } else if(this.feature.feature_type == 1 && this.feature.radius < (measurement *.5) + 1) {
          this.feature.width = measurement;
          this.feature.radius = (this.feature.width *.5) + 1;
          this.alert.error('The radius must be greater than half the width. Radius set to: ' + this.feature.radius);
        } else {
          this.feature.width = measurement;
        }
        break;

      case "height":
        if(measurement < 50) {
          this.feature.height = 50;
          this.alert.error('The minimum height is 50 inches');
        } else if((this.feature.feature_type == 0 || this.feature.feature_type == 1) && measurement > 84) {
          this.feature.height = 84;
          this.alert.error('The maximum height for partitions is 84 inches');
        } else if(measurement > 480) {
          this.feature.height = 480;
          this.alert.error('The maximum height for walls and ceilings is 480 inches');
        } else {
          this.feature.height = measurement;
        }
        break;

      case "radius":
        if(measurement < (this.feature.width *.5) + 1) {
          this.feature.radius = (this.feature.width *.5) + 1;
          this.alert.error('The radius must be greater than half the width. Radius set to: ' + this.feature.radius);
        } else if(measurement > 300) {
          this.feature.radius = (this.feature.width *.5) + 1;
          this.alert.error('The maximum radius is 300 inches.');
        } else if(measurement < 30) {
          this.feature.radius = (this.feature.width *.5) + 1;
          this.alert.error('The minimum radius is 30 inches');
        } else {
          this.feature.radius = measurement;
        }
        break;

      case "angle":
        this.feature.angle = measurement;
        break;

      case "ceiling_length":
        if(measurement < 50) {
          this.feature.ceiling_length = 50;
          this.alert.error('The minimum ceiling length is 50 inches');
        } else if(measurement > 144) {
          this.feature.ceiling_length = 144;
          this.alert.error('The maximum ceiling length is 144 inches');
        } else {
          this.feature.ceiling_length = measurement;
        }
        break;

      default:
        alert(name + " is not a valid measurement");
        break;
    }

    this.feature.reloadVisualization();
  }

}
