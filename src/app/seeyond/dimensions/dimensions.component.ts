import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Feature } from '../feature';
import 'rxjs/add/operator/map';

var featuresJSON = require('../../../assets/features.json');

@Component({
  selector: 'seeyond-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.css']
})
export class DimensionsComponent implements OnInit {
  features = [];

  constructor(private feature: Feature) {
    this.features = featuresJSON;
  }

  ngAfterViewInit() {
    this.feature.updateFeature(this.features[0]);
  }

  ngOnInit() {

  }

  public updateSelectedFeature(index: number) {
    console.log(this.features[index]);
    this.feature.updateFeature(this.features[index]);
  }

  public updateFeatureMeasurement(measurement: string, index: number) {
    console.log('feature data');
    console.log(measurement);
    console.log(index);

    this.feature.measurements[index].value = measurement;
    console.log(this.feature.measurements);

    this.feature.reloadVisualization();
  }

}
