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
  public estimatedAmt: number; // this should be determined by the boxCost and number of boxes in design
  public acousticFoam: boolean = false;
  public quoted: boolean = false; // boolean
  public archived: boolean = false; // boolean
  public boxsize: number = 16; // baked in number right now.
  public features: any = {
    "0": {
      "feature_type": 0,
      "name": "linear-partition",
      "title": "Freestanding Linear Partition",
      "image": "/assets/images/renderings/freestanding_linear_partition.png",
      "width": 96,
      "height": 72,
    },
   "1": {
      "feature_type": 1,
      "name": "curved-partition",
      "title": "Freestanding Curved Partition",
      "image": "/assets/images/renderings/freestanding_curved_partition.png",
      "width": 96,
      "height": 72,
      "radius": 60,
    },
   "2": {
      "feature_type": 2,
      "name": "wall",
      "title": "Wall Feature",
      "image": "/assets/images/renderings/wall.png",
      "width": 48,
      "height": 48,
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
    }
    // "4": {
    //   "feature_type": 4,
    //   "name": "ceiling",
    //   "title": "Ceiling Feature",
    //   "image": "/assets/images/renderings/ceiling.png",
    //   "width": 48,
    //   "height": 48
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

    this.reloadVisualization();
  }

  loadFeature(feature: Feature) {
    this.id = feature.id;
    this.uid = feature.uid;
    this.feature_type = feature.feature_type;
    this.title = feature.title;
    this.name = feature.name;
    this.design_name = feature.design_name;
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
    this.archived = feature.archived;
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
    var acousticFoamCost = 13.67;
    var sheetCost = 63.15;
    var stapleCost: number = (5.13/5000)/.4;
    var ziptieCost: number = 0.08;
    var magnetCost: number = 0.83;
    var backplateCost: number = 14.50;
    var frameCost: number = 36.75;

    var sheets = this.syd_t.QT.GetSheets();
    var columns = this.syd_t.QT.GetU();
    var rows = this.syd_t.QT.GetV();
    this.boxes = this.syd_t.QT.GetParts();

    // PRODUCTS
    var totalProductsCost = sheets * sheetCost;
    if(this.acousticFoam) {
      totalProductsCost += (acousticFoamCost * this.boxes);
    }

    // HARDWARE
    // This is only for the walls just to get my head wrapped around this...
    var totalHardwareCost = 0;
    // 3-15-1606
    totalHardwareCost += (4 * Math.ceil(this.boxes/4)) * 1.81;
    // 3-85-104
    totalHardwareCost += (4 * Math.ceil(this.boxes/4)) * 0.61;
    // 3-85-109
    totalHardwareCost += (4 * Math.ceil(this.boxes/4)) * 0.09;

    // SERVICES
    var staples: number = this.boxes * 25;
    var zipties: number = this.boxes * 0;
    var magnets: number = this.syd_t.QT.GetMagnets();
    var backplates: number = Math.ceil(Math.ceil(this.boxes/4)/3);
    var frames: number = Math.ceil(this.boxes/18);
    var fabricationCost = this.getFabricationCost(this.feature_type);

    var totalServiceCost = (staples * stapleCost) + (zipties * ziptieCost) + (magnets * magnetCost) + (backplates * backplateCost) + (frames * frameCost) + fabricationCost;

    console.log("Rows: " + rows);
    console.log("Columns: " + columns);
    console.log("boxes: " + this.boxes);
    console.log("sheets: " + sheets);
    console.log("magnets: " + magnets);
    console.log("stapleCost: " + stapleCost);
    console.log("Staples cost: " + (staples * stapleCost));
    console.log("Zipties cost: " + (zipties * ziptieCost));
    console.log("Magnets cost: " + (magnets * magnetCost));
    console.log("Backplates: " + backplates);
    console.log("Backplates cost: " + (backplates * backplateCost));
    console.log("Frames: " + frames);
    console.log("Frames cost: " + (frames * frameCost));
    console.log("Fabrication cost: " + fabricationCost);
    console.log("Products cost: " + totalProductsCost);
    console.log("Hardware cost: " + totalHardwareCost);
    console.log("Services cost: " + totalServiceCost);

    this.estimatedAmt = totalProductsCost + totalHardwareCost + totalServiceCost;
    return this.estimatedAmt;
  }

  updateAcousticFoam(value: boolean) {
    this.acousticFoam = value;
    // feature has been updated (so we can update the price to include acoustic foam)
    this.onFeatureUpdated.emit();
  }

  getFabricationCost(feature_type: number) {
    var ceilingFab = 48.46;
    var partitionFab = 48.46;
    var wallFab = 44.13;
    var fabricationCost: number;

    switch (feature_type) {
      case 0:
        // linear
        fabricationCost = this.boxes * partitionFab;
        break;

      case 1:
        fabricationCost = this.boxes * partitionFab;
        break;

      case 2:
        fabricationCost = this.boxes * wallFab;
        break;

      case 3:
        // fabricationCost = (this.getWallBoxes() * wallFab) + (this.getCeilingBoxes() * ceilingFab);
        fabricationCost = this.boxes * ceilingFab;
        break;

      case 4:
        fabricationCost = this.boxes * ceilingFab;
        break;

      default:
        // shouldn't happen, but if it does default to the partition fab cost.
        fabricationCost = this.boxes * partitionFab;
        break;
    }

    return fabricationCost;
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
    // console.log(properties);

    var takeOff = properties.Take_Off;
    var hemi = "single";
    if (this.syd_t.QT.Two_Sided) {
      hemi = "double";
    }

    var XMLWriter = require('xml-writer');
    var xw = new XMLWriter(true);
    xw.formatting = 'indented'; //add indentation and newlines
    xw.indentChar = ' '; //indent with spaces
    xw.indentation = 2; //add 2 spaces per level
    xw.startDocument();
    xw.startElement('seeyondProject');

    xw.startElement('projectID');
    if(this.id) {
      xw.text(this.id);
    }else{
      xw.text('New Project');
    }
    xw.endElement('projectID');

    if(this.uid) {
      xw.startElement('user');
         xw.startElement('uid');
           xw.text(this.uid);
         xw.endElement('uid');
         // xw.startElement('name')
         //   xw.text(this.user.getFullname());
         // xw.endElement('name');
         // xw.startElement('email');
         //   xw.text(this.user.email);
         // xw.endElement('email');
      xw.endElement('user');
    }

    xw.startElement('order');

      xw.startElement('orderDate');
      xw.text('2017-01-22'); //TO DO: insert order date here
      xw.endElement('orderDate');
      // TO DO: add the products price, hardware price and services price
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
        xw.startElement('partid');
          xw.text('#-###-###'); //TO DO: add the partid as a property
        xw.endElement('partid');
        xw.startElement('name');
          xw.text(this.material);
        xw.endElement('name');
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
