import { Injectable } from '@angular/core';

@Injectable()
export class Feature {
  private static _instance: Feature = new Feature();
  public type: number = 0;
  public title: string = '';
  public image: string = '';
  public measurements: any = [];
  public material: string = '';
  public tessellation: number = 0;
  public patternStrength: number = 3;
  public syd_v: any = {};
  public syd_t: any = {};
  public data: any = [];

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    this.syd_t = require( 'syd-tessellation' );
    this.syd_v = require( 'syd-visualization' );

    Feature._instance = this;
  }

  updateFeature(
    feature: any
  ) {
    this.title = feature.title;
    this.measurements = feature.measurements;
    this.image = feature.image;
    this.type = feature.type;

    this.reloadVisualization();
  }

  reloadVisualization()
  {
    // CURRENT WORKAROUND. EVENTUALLY WE WANT TO BE ABLE TO JUST PASS THE WHOLE FEATURE. MAYBE...
    var jsonProperties = this.getJsonProperties();
    this.syd_t.QT.SetUserDataPropertiesJSONString(JSON.stringify(jsonProperties));

    // set the patternStrength
    this.syd_t.QT.SetPatternStrength(this.patternStrength);

    // this.syd_t.QT.SetUserDataProperties(feature);
    this.syd_t.QT.UpdateFeature();
    var front = this.syd_t.QT.GetFrontSurfacePoints();
    var back = this.syd_t.QT.GetBackSurfacePoints();
    var uNum = this.syd_t.QT.GetU();
    var vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, 0xddffdd);
  }

  getJsonProperties()
  {
    return {
      "UserInputs": {
        "Type": this.type? this.type : 0,
        "Tessellation": this.tessellation? this.tessellation : 0,
        "Width": this.measurements[0]['value'],
        "Height": this.measurements[1]['value'],
        "Radius": this.measurements[2]? this.measurements[2] : 400,
        "Angle":  this.measurements[3]? this.measurements[3] : 0,
      }
    }
  }
}
