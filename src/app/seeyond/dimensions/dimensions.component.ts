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
  selectedFeature = 2; // wall feature

  constructor(private feature: Feature) {
    this.features = featuresJSON;
  }

  ngAfterViewInit() {
    console.log(this.features);
    this.feature.updateFeature(this.features[2]);
  }

  ngOnInit() {

  }

  public updateSelectedFeature(type: number) {
    console.log(type);
    this.selectedFeature = type;
    this.feature.updateFeature(this.features[type]);
  }

  public updateFeatureMeasurement(measurement: number, name: string) {
    switch (name) {
      case "Width":
        this.feature.width = measurement;
        break;

      case "Height":
        this.feature.height = measurement;
        break;

      case "Radius":
        this.feature.radius = measurement;
        break;

      case "Angle":
        this.feature.angle = measurement;
        break;

      case "Ceiling Length":
        this.feature.ceilingLength = measurement;
        break;

      default:
        alert(name + " is not a valid measurement");
        break;
    }

    this.feature.reloadVisualization();
  }

}
