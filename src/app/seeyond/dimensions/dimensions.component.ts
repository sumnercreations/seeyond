import { Component, OnInit, ViewContainerRef, EventEmitter, Output } from '@angular/core';
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
  @Output() onFeatureUpdated = new EventEmitter();

  constructor(
    private feature: Feature,
    private alertService: AlertService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  public updateSelectedFeature(name: string) {
    this.router.navigate(['/feature', name]);
  }

  public updateFeatureMeasurement(measurement: number, name: string) {
    switch (name) {
      case "width":
        this.feature.width = measurement;
        if(this.feature.radius < measurement *.5) {
          this.feature.radius = (this.feature.width *.5) + 12;
          this.alertService.error('The radius must be at least half the width. Radius set to: ' + this.feature.radius);
          console.log(this.feature.radius);
        }
        break;

      case "height":
        this.feature.height = measurement;
        break;

      case "radius":
        if(measurement < this.feature.width *.5) {
          this.feature.radius = (this.feature.width *.5) + 12;
          this.alertService.error('The radius must be at least half the width. Radius set to: ' + this.feature.radius);
        } else {
          this.feature.radius = measurement;
        }
        break;

      case "angle":
        this.feature.angle = measurement;
        break;

      case "ceilingLength":
        this.feature.ceilingLength = measurement;
        break;

      default:
        alert(name + " is not a valid measurement");
        break;
    }

    console.log('emitting a feature update');
    this.onFeatureUpdated.emit();
    this.feature.reloadVisualization();
  }

}
