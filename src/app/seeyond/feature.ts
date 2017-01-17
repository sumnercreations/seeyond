import { Injectable } from '@angular/core';

@Injectable()
export class Feature {
  private static _instance: Feature = new Feature();
  public type: string = '';
  public title: string = '';
  public image: string = '';
  public measurements: any = [];
  public pattern: string = '';
  public patternStrength: string = '';

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }
    Feature._instance = this;
  }

  updateFeature(
    feature: any
  ) {
    this.title = feature.title;
    this.measurements = feature.measurements;
    this.image = feature.image;

    // update the visualization
    var syd_t = require( 'syd-tessellation' );
    var syd_v = require( 'syd-visualization' );
    // syd_t.QT.SetUserDataProperties(
    //   {
    //     Type:0,
    //     Tessellation:0,
    //     Width:120,
    //     Height:60,
    //     Radius:60,
    //     Angle:0
    //   }
    // );
    // syd_t.QT.SetUserDataProperties({});
    syd_t.QT.SetTessellationArray({});
    syd_t.QT.UpdateFeature();
    var data = syd_t.QT.GetTessellationArray();
    // syd_v.QT.Visualization.visualizeWall(data, 8, 6, 0xff9933);
  }
}
