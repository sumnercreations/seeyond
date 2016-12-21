import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
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
  selectedFeature: Feature;

  constructor(http: Http) {
    this.features = featuresJSON;
    this.selectedFeature = this.features[0];
  }

  ngOnInit() {

  }

}
