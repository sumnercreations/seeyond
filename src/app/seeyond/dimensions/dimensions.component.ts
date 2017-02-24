import { Component, OnInit, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

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
    public snackBar: MdSnackBar,
    public viewContainerRef: ViewContainerRef,
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
        break;

      case "height":
        this.feature.height = measurement;
        break;

      case "radius":
        if(measurement < this.feature.width *.5) {
          this.openSnackBar('The radius must be at least half the width.');
          this.feature.radius = (this.feature.width *.5) + 20;
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

  public openSnackBar(msg: string) {
      let config = new MdSnackBarConfig();
      this.snackBar.open(msg, 'dismiss');
  }

}

@Component({
  selector: 'snack-bar-radius-warning',
  template: '<p></p>',
})
export class RadiusWarningSnackComponent {}
