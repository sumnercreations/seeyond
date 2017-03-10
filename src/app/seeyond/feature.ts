import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Feature {
  onFeatureUpdated = new EventEmitter();
  private static _instance: Feature = new Feature();
  public id: number;
  public uid: number;
  public feature_type: number;
  public title: string;
  public name: string;
  public design_name: string;
  public image: string;
  public width: number;
  public height: number;
  public radius: number;
  public angle: number;
  public ceiling_length: number;
  public syd_v: any = {};
  public syd_t: any = {};
  public data: any = [];
  public xml: any = {};
  public tessellation: number = 0; // court
  public pattern_strength: number = 3;
  public material: string = 'zinc';
  public boxes: number; // this comes from the tessellation
  public boxCost: number;
  public estimatedAmt: number; // this should be determined by the boxCost and number of boxes in design
  public acousticFoam: boolean = false;
  public quoted: boolean = false; // boolean
  public boxsize: number = 14; // baked in number right now.
  public features: any = {
    "0": {
      "feature_type": 0,
      "name": "linear-partition",
      "title": "Freestanding Linear Partition",
      "image": "/assets/images/renderings/freestanding_linear_partition.png",
      "width": 96,
      "height": 72,
      "boxCost": 85.37
    },
   "1": {
      "feature_type": 1,
      "name": "curved-partition",
      "title": "Freestanding Curved Partition",
      "image": "/assets/images/renderings/freestanding_curved_partition.png",
      "width": 96,
      "height": 72,
      "radius": 60,
      "boxCost": 85.37
    },
   "2": {
      "feature_type": 2,
      "name": "wall",
      "title": "Wall Feature",
      "image": "/assets/images/renderings/wall.png",
      "width": 48,
      "height": 48,
      "boxCost": 85.37
    },
   "3": {
      "feature_type": 3,
      "name": "wall-to-ceiling",
      "title": "Wall-to-Ceiling Feature",
      "image": "/assets/images/renderings/wall_to_ceiling.png",
      "width": 72,
      "height": 96,
      "angle": 90,
      "ceiling_length": 72,
      "boxCost": 87.17
    }
    // "4": {
    //   "feature_type": 4,
    //   "name": "ceiling",
    //   "title": "Ceiling Feature",
    //   "image": "/assets/images/renderings/ceiling.png",
    //   "width": 48,
    //   "height": 48,
    //   "boxCost": 85.37
    // },
  };

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    this.syd_t = require( 'syd-tessellation' );
    this.syd_v = require( 'syd-visualization' );

    Feature._instance = this;
  }

  updateFeature(
    feature_type: number
  ) {
    // load the selected feature
    var feature = this.features[feature_type];

    // set defaults
    this.feature_type = feature_type;
    this.name = feature.name;
    this.title = feature.title;
    this.image = feature.image;
    this.width = feature.width;
    this.height = feature.height;
    this.radius = feature.radius;
    this.angle = feature.angle;
    this.ceiling_length = feature.ceiling_length;
    this.boxCost = feature.boxCost;

    this.reloadVisualization();
  }

  loadFeature(feature: Feature) {
    this.id = feature.id;
    this.uid = feature.uid;
    this.feature_type = feature.feature_type;
    this.title = feature.title;
    this.name = feature.name;
    this.width = feature.width;
    this.height = feature.height;
    this.radius = feature.radius;
    this.angle = feature.angle;
    this.ceiling_length = feature.ceiling_length;
    this.tessellation = feature.tessellation;
    this.pattern_strength = feature.pattern_strength;
    this.material = feature.material;
    this.boxes = feature.boxes;
    this.xml = feature.xml;
    this.acousticFoam = feature.acousticFoam;
    this.quoted = feature.quoted;
    this.boxCost = this.getBoxCost(feature.feature_type); // need to get this from the feature_type as well
    this.image = this.getFeatureImage(feature.feature_type); // need to get this from the feature_type

    this.reloadVisualization();
  }

  reloadVisualization() {
    var jsonProperties = this.getJsonProperties();

    this.syd_t.QT.SetUserDataPropertiesJSONString(JSON.stringify(jsonProperties));
    this.syd_t.QT.UpdateFeature();

    var front = this.syd_t.QT.GetFrontSurfacePoints();
    var back = this.syd_t.QT.GetBackSurfacePoints();
    var uNum = this.syd_t.QT.GetU();
    var vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.SetFeatureType(this.feature_type);
    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));

    // feature has been updated
    this.onFeatureUpdated.emit();

    // update the XML
    this.xml = this.getXML();
  }

  updateEstimatedAmount() {
    var sheets = this.syd_t.QT.GetSheets();
    var magnets = this.syd_t.QT.GetMagnets();
    this.boxes = this.syd_t.QT.GetParts();
    console.log("boxes: " + this.boxes);
    console.log("sheets: " + sheets);
    console.log("magnets: " + magnets);
    this.estimatedAmt = this.boxes * this.boxCost;
    return this.estimatedAmt;
  }

  getMaterialImage(material: string) {
    return '/assets/images/materials/' + material + '.jpg';
  }

  getMaterialName(material: string) {
    return material.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getTessellationImage(tessellation: number) {
    return '/assets/images/patterns/' + this.getTessellationName(tessellation).toLowerCase() + '.jpg';
  }

  getTessellationName(tessellation: number) {
    var name: string;
    switch (tessellation) {
      case 0:
        name = "Court";
        break;

      case 1:
        name = "Cusp";
        break;

      case 2:
        name = "Kink";
        break;

      case 3:
        name = "Tilt";
        break;

      case 4:
        name = "Billow";
        break;

      default:
        name = "Pattern name not found for tessellation: " + tessellation;
        break;
    }
    return name;
  }

  getFormattedAmount() {
    var accounting = require( 'accounting' );
    return accounting.formatMoney(this.estimatedAmt);
  }

  getFormattedAcousticFoam() {
    return this.acousticFoam ? "Yes" : "No";
  }

  getBoxCost(feature_type: number) {
    return this.features[feature_type].boxCost;
  }

  getFeatureImage(feature_type: number) {
    return this.features[feature_type].image;
  }

  getJsonProperties() {
    return {
      "UserInputs": {
        // 0 = straight partition, 1 = arc partition, 2 = facing, 3 = transition, 4 = ceiling, 5 = bent partition
        "Type": this.feature_type,
        // 0 = court, 1 = cusp, 2 = kink, 3 = tilt, 4 = billow
        "Tessellation": this.tessellation,
        // valid values = .1 - 1.0 (we send whole numbers 1-10 and the tesselation divides by 10)
        "PatternStrength": this.pattern_strength,
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
        "Ceiling_Length": this.ceiling_length
      }
    }
  }

  getXML()
  {
    var front = this.syd_t.QT.GetFrontSurfacePoints();
    var back = this.syd_t.QT.GetBackSurfacePoints();
    var uNum = this.syd_t.QT.GetU();
    var vNum = this.syd_t.QT.GetV();

    var properties = JSON.parse(this.syd_t.QT.GetAllPropertiesAsJSONString());
    console.log(properties);

    var takeOff = properties.Take_Off;
    var hemi = "single";
    if (this.syd_t.QT.Two_Sided) {
      hemi = "double";
    }

    var XMLWriter = require('xml-writer');
    var xw = new XMLWriter();
    xw.formatting = 'indented'; //add indentation and newlines
    xw.indentChar = ' '; //indent with spaces
    xw.indentation = 2; //add 2 spaces per level
    xw.startDocument();
    xw.startElement('seeyondProject');

    xw.startElement('projectID');
    xw.text('0001'); //TO DO: insert project ID here
    xw.endElement('projectID');

    xw.startElement('user');
    xw.text('testUser'); //TO DO: insert user here
    xw.endElement('user');

    xw.startElement('order');

      xw.startElement('orderDate');
      xw.text('2017-01-22'); //TO DO: insert order date here
      xw.endElement('orderDate');

      xw.startElement('price');
      xw.text(this.estimatedAmt);
      xw.endElement('price');

      xw.startElement('notes');
      xw.text('Test comments here.'); //TO DO: insert notes here
      xw.endElement('notes');

    xw.endElement('order');

    xw.startElement('userInputs');

      var feature_type = 'StraightPartition';
      switch(properties.UserInputs.Type) {
        // freestanding linear
        case 0:
          feature_type = 'Freestanding Linear';
          break;

        // freestanding curved partition
        case 1:
          feature_type = 'Freestanding Curved';
          break;

        // wall feature
        case 2:
          feature_type = 'Wall';
          break;

        // wall-to-ceiling partition
        case 3:
          feature_type = 'Wall-to-Ceiling';
          break;

        // ceiling feature
        case 4:
          feature_type = 'Ceiling Feature';
          break;

        // wall
        default:
          feature_type = 'Wall';
      }

      xw.startElement('installationType');
      xw.text(feature_type);
      xw.endElement('installationType');

      var tessellation = 'quad';
      switch(properties.UserInputs.Tessellation) {
        case 1:
            tessellation = 'cusp';
            break;
        case 2:
            tessellation = 'kink';
            break;
        case 3:
            tessellation = 'tilt';
            break;
        case 4:
            tessellation = 'billow';
            break;
        default:
            tessellation = 'court';
      }

      xw.startElement('tessellation');
      xw.text(tessellation);
      xw.endElement('tessellation');

      xw.startElement('width');
      xw.text(properties.UserInputs.Width);
      xw.endElement('width');

      xw.startElement('height');
      xw.text(properties.UserInputs.Height);
      xw.endElement('height');

      if(feature_type == 'Freestanding Curved') {
        xw.startElement('radius');
        xw.text(properties.UserInputs.Radius);
        xw.endElement('radius');
      }

      if(feature_type == 'Wall-to-Ceiling') {
        xw.startElement('angle');
        xw.text(properties.UserInputs.Angle);
        xw.endElement('angle');

        xw.startElement('ceiling_length');
        xw.text(properties.UserInputs.Ceiling_Length);
        xw.endElement('ceiling_length');
      }

      xw.startElement('columns');
      xw.text(uNum);
      xw.endElement('columns');

      xw.startElement('rows');
      xw.text(vNum);
      xw.endElement('rows');

      xw.startElement('patternStrength');
      xw.text(properties.UserInputs.PatternStrength);
      xw.endElement('patternStrength');

    xw.endElement('userInputs');

    xw.startElement('productAttributes');

      xw.startElement('material');
      xw.text('felt');  //TO DO: insert material spec here
      xw.endElement('material');

      xw.startElement('hemisphere');
      xw.text(hemi);
      xw.endElement('hemisphere');

      xw.startElement('faceSizeTarget');
      xw.text(properties.BoxSize.toString());
      xw.endElement('faceSizeTarget');

      xw.startElement('depthTarget');
      xw.text(properties.Depth.toString());
      xw.endElement('depthTarget');

    xw.endElement('productAttributes');

    xw.startElement('takeOff');

        xw.startElement('parts');
        xw.text(takeOff.Parts);
        xw.endElement('parts');

        xw.startElement('magnets');
        xw.text(takeOff.Magnets);
        xw.endElement('magnets');

        xw.startElement('sheets');
        xw.text(takeOff.Sheets);
        xw.endElement('sheets');

    xw.endElement('takeOff');

    xw.startElement('Geometry');

    xw.startElement('Front');
    for(var i=0;i<uNum;i++) {
      for(var j=0;j<vNum;j++) {
        xw.startElement('Panel_' + "0" + "-" + i + "-" + j);
          xw.startElement('pt0');
            xw.text('{' + front[i+1][j][0] + ',' + front[i+1][j][1] + ',' + front[i+1][j][2] + '}');
          xw.endElement('pt0');
          xw.startElement('pt1');
            xw.text('{' + front[i][j][0] + ',' + front[i][j][1] + ',' + front[i][j][2] + '}');
          xw.endElement('pt1');
          xw.startElement('pt2');
            xw.text('{' + front[i][j+1][0] + ',' + front[i][j+1][1] + ',' + front[i][j+1][2] + '}');
          xw.endElement('pt2');
          xw.startElement('pt3');
            xw.text('{' + front[i+1][j+1][0] + ',' + front[i+1][j+1][1] + ',' + front[i+1][j+1][2] + '}');
          xw.endElement('pt3');
        xw.endElement('Panel_' + "0" + "-" + i + "-" + j);
      }
    }

    xw.endElement('Front');

    xw.startElement('Back');
    for(var i=0;i<uNum;i++) {
      for(var j=0;j<vNum;j++) {
        xw.startElement('Panel_' + "1" + "-" + i + "-" + j);
        xw.startElement('pt0');
          xw.text('{' + back[i+1][j][0] + ',' + back[i+1][j][1] + ',' + back[i+1][j][2] + '}');
        xw.endElement('pt0');
        xw.startElement('pt1');
          xw.text('{' + back[i][j][0] + ',' + back[i][j][1] + ',' + back[i][j][2] + '}');
        xw.endElement('pt1');
        xw.startElement('pt2');
          xw.text('{' + back[i][j+1][0] + ',' + back[i][j+1][1] + ',' + back[i][j+1][2] + '}');
        xw.endElement('pt2');
        xw.startElement('pt3');
          xw.text('{' + back[i+1][j+1][0] + ',' + back[i+1][j+1][1] + ',' + back[i+1][j+1][2] + '}');
        xw.endElement('pt3');
        xw.endElement('Panel_' + "1" + "-" + i + "-" + j);
      }
    }
    xw.endElement('Back');
    xw.endElement('Geometry');
    xw.endDocument();

    var xml_string = xw.toString().substring(21);
    return xml_string;
  }
}
