import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Feature } from '../Feature';
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
    // feature.updateFeature(this.features[0]);
  }

  ngAfterViewInit() {
    this.feature.updateFeature(this.features[0]);
  }

  ngOnInit() {

  }

  public updateSelectedFeature(index: number) {
    this.feature.updateFeature(this.features[index]);
  }

}
