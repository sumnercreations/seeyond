import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Feature } from '../feature';

var featuresJSON = require('../../../assets/features.json');

@Component({
  selector: 'seeyond-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.css']
})
export class DimensionsComponent implements OnInit {
  features = [];
  selectedFeature: number = this.feature.type;

  constructor(private feature: Feature) {
    this.features = featuresJSON;
  }

  ngAfterViewInit() {
    this.feature.reloadVisualization();
  }

  ngOnInit() {

  }

  public updateSelectedFeature(type: number) {
    this.selectedFeature = type;
    this.feature.updateFeature(this.features[type]);
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
        this.feature.radius = measurement;
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

    this.feature.reloadVisualization();
  }

}
