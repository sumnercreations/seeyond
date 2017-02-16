import { Injectable } from '@angular/core';

@Injectable()
export class Feature {
  private static _instance: Feature = new Feature();
  public type: number = 2; // wall feature
  public title: string = 'Wall Feature';
  public image: string = '/assets/images/features/wall.jpg';
  public width: number = 250;
  public height: number = 250;
  public radius: number;
  public angle: number;
  public ceilingLength: number;
  public material: string = 'burnt_umber';
  public tessellation: number = 4;
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
    this.type = feature.type;
    this.title = feature.title;
    this.image = feature.image;
    this.width = feature.width;
    this.height = feature.height;
    this.radius = feature.radius;
    this.angle = feature.angle;
    this.ceilingLength = feature.ceilingLength;

    this.reloadVisualization();
  }

  reloadVisualization()
  {
    var jsonProperties = this.getJsonProperties();

    this.syd_t.QT.SetUserDataPropertiesJSONString(JSON.stringify(jsonProperties));
    this.syd_t.QT.UpdateFeature();

    var front = this.syd_t.QT.GetFrontSurfacePoints();
    var back = this.syd_t.QT.GetBackSurfacePoints();
    var uNum = this.syd_t.QT.GetU();
    var vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));
  }

  getMaterialImage(material: string)
  {
    return '/assets/images/materials/' + material + '.jpg';
  }

  getJsonProperties()
  {
    return {
      "UserInputs": {
        // 0 = straight partition, 1 = arc partition, 2 = facing, 3 = transition, 4 = ceiling, 5 = bent partition
        "Type": this.type? this.type : 2,
        // 0 = court, 1 = cusp, 2 = kink, 3 = tilt, 4 = billow
        "Tessellation": this.tessellation? this.tessellation : 4,
        // valid values = .1 - 1.0 (we send whole numbers 1-10 and the tesselation divides by 10)
        "PatternStrength": this.patternStrength? this.patternStrength : 3,
        // relative path to rendering material image
        "Material": this.material? this.getMaterialImage(this.material) : '/assets/images/materials/burnt_umber.jpg',
        // in inches
        "Width": this.width? this. width : 250,
        // in inches
        "Height": this.height? this. height : 250,
        // in inches
        "Radius": this.radius? this.radius : 120,
        // in degrees 0-360
        "Angle":  this.angle? this.angle : 90,
        // in inches
        "Ceiling_Length": this.ceilingLength? this.ceilingLength : 250,
      }
    }
  }
}
