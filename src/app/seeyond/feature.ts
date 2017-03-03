import { Injectable } from '@angular/core';

@Injectable()
export class Feature {
  private static _instance: Feature = new Feature();
  public id: number;
  public type: number;
  public title: string;
  public name: string;
  public image: string;
  public width: number;
  public height: number;
  public radius: number;
  public angle: number;
  public ceilingLength: number;
  public syd_v: any = {};
  public syd_t: any = {};
  public data: any = [];
  public xml: any = {};
  public tessellation: number = 0; // court
  public patternStrength: number = 3;
  public material: string = 'zinc';
  public estimatedAmt: number = 9 * 85.37;
  public boxsize: number = 14;
  public boxCost: number = 85.37;
  public boxes: number = 9; // this will need to come from the tessellation
  public acousticFoam: number = 0;
  public quoted: number = 0;
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
    var feature = this.features[type];
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

  reloadVisualization() {
    var jsonProperties = this.getJsonProperties();

    this.syd_t.QT.SetUserDataPropertiesJSONString(JSON.stringify(jsonProperties));
    this.syd_t.QT.UpdateFeature();

    var front = this.syd_t.QT.GetFrontSurfacePoints();
    var back = this.syd_t.QT.GetBackSurfacePoints();
    var uNum = this.syd_t.QT.GetU();
    var vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.SetFeatureType(this.type);
    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));

    // update the XML
    this.xml = this.getXML();
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

  getJsonProperties() {
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
      xw.text('123.45'); //TO DO: insert price here
      xw.endElement('price');

      xw.startElement('notes');
      xw.text('Test comments here.'); //TO DO: insert notes here
      xw.endElement('notes');

    xw.endElement('order');

    xw.startElement('userInputs');

      var feature_type = 'StraightPartition';
      switch(properties.UserInputs.Type) {
        // wall-to-ceiling partition
        case 1:
        feature_type = 'Wall-to-Ceiling';
        break;

        // freestanding linear
        case 2:
        feature_type = 'Freestanding Linear';
        break;

        // freestanding curved partition
        case 3:
        feature_type = 'Freestanding Curved';
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
