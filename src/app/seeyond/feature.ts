import { Injectable } from '@angular/core';

@Injectable()
export class Feature {
  private static _instance: Feature = new Feature();
  public type: number;// = 2; // wall feature
  public title: string;// = 'Wall Feature';
  public name: string;
  public image: string;// = '/assets/images/features/wall.jpg';
  public width: number;// = 48;
  public height: number;// = 48;
  public radius: number;
  public angle: number;
  public ceilingLength: number;
  public syd_v: any = {};
  public syd_t: any = {};
  public data: any = [];
  public tessellation: number = 4;
  public patternStrength: number = 3;
  public material: string = 'burnt_umber';
  public estimatedAmt: number = 9 * 85.37;
  public boxCost: number = 85.37;
  public boxes: number = 9; // this will need to come from the tessellation
  public features: any = {
    "0": {
      "type": 0,
      "name": "linear-partition",
      "title": "Freestanding Linear Partition",
      "image": "/assets/images/renderings/freestanding_linear_partition.jpg",
      "width": 96,
      "height": 72
    },
   "1": {
      "type": 1,
      "name": "curved-partition",
      "title": "Freestanding Curved Partition",
      "image": "/assets/images/renderings/freestanding_curved_partition.jpg",
      "width": 96,
      "height": 72,
      "radius": 60
    },
   "2": {
      "type": 2,
      "name": "wall",
      "title": "Wall Feature",
      "image": "/assets/images/renderings/wall.jpg",
      "width": 48,
      "height": 48
    },
   "3": {
      "type": 3,
      "name": "wall-to-ceiling",
      "title": "Wall-to-Ceiling Feature",
      "image": "/assets/images/renderings/wall_to_ceiling.jpg",
      "width": 72,
      "height": 96,
      "angle": 90,
      "ceilingLength": 72
    }
  }

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    this.syd_t = require( 'syd-tessellation' );
    this.syd_v = require( 'syd-visualization' );

    Feature._instance = this;
  }

  updateFeature(
    type: number
  ) {
    let feature = this.features[type];
    this.type = type;
    this.title = feature.title;
    this.name = feature.name;
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

    this.syd_v.QT.Visualization.SetFeatureType(this.type);
    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));
  }

  updateEstimatedAmount() {
    switch (this.type) {
      case 0:
        // linear partition
        this.boxCost = 85.37;
        break;

      case 1:
        // curved partition
        this.boxCost = 85.37;
        break

      case 2:
        // wall
        this.boxCost = 85.37;
        break

      case 3:
        // wall to ceiling
        this.boxCost = 87.17;
        break

      default:
        alert('unable to calculate the cost ' + this.type + ' is not a valid feature type');
        break;
    }

    this.estimatedAmt = this.boxes * this.boxCost;
    return this.estimatedAmt;
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
        "Type": this.type,
        // 0 = court, 1 = cusp, 2 = kink, 3 = tilt, 4 = billow
        "Tessellation": this.tessellation,
        // valid values = .1 - 1.0 (we send whole numbers 1-10 and the tesselation divides by 10)
        "PatternStrength": this.patternStrength,
        // relative path to rendering material image
        "Material": this.getMaterialImage(this.material),
        // in inches
        "Width": this.width,
        // in inches
        "Height": this.height,
        // in inches
        "Radius": this.radius,
        // in degrees 0-360
        "Angle":  this.angle,
        // in inches
        "Ceiling_Length": this.ceilingLength
      }
    }
  }
}
