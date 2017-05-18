import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class Feature {
  onFeatureUpdated = new EventEmitter();
  private static _instance: Feature = new Feature();
  private debug: any;
  public id: number;
  public uid: number;
  public feature_type: number;
  public title: string;
  public name: string;
  public design_name: string;
  public project_name: string;
  public specifier: string;
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
  public sheet_part_id: string = '0-51-804';
  public boxes: number;
  public sheets: number;
  public estimated_amount: number;
  public services_amount: number;
  public acoustic_foam: boolean = false;
  public random_seed: number;
  public quoted: boolean = false; // boolean
  public archived: boolean = false; // boolean
  public boxsize: number = 16; // baked in number right now.
  public prices: any;
  public hardware: any = [];
  public felt_sheet_mapping: any = {
    "ebony": "0-51-800",
    "dark_gray": "0-51-801",
    "ore": "0-51-802",
    "nickel": "0-51-803",
    "zinc": "0-51-804",
    "burnt_umber": "0-51-805",
    "cashmere": "0-51-806",
    "cast": "0-51-807"
  }
  public features: any = {
    "0": {
      "feature_type": 0,
      "name": "linear-partition",
      "title": "Freestanding Linear Partition",
      "image": "/assets/images/renderings/freestanding_linear_partition.png",
      "width": 96,
      "height": 72,
      "hardware": {
        "3-15-0842": {},
        "3-85-105": {},
        "3-85-106": {},
        "3-85-102": {} //zipties
      }
    },
   "1": {
      "feature_type": 1,
      "name": "curved-partition",
      "title": "Freestanding Curved Partition",
      "image": "/assets/images/renderings/freestanding_curved_partition.png",
      "width": 96,
      "height": 72,
      "radius": 60,
      "hardware": {
        "3-15-0842": {},
        "3-85-105": {},
        "3-85-106": {},
        "3-85-102": {} //zipties
      }
    },
   "2": {
      "feature_type": 2,
      "name": "wall",
      "title": "Wall Feature",
      "image": "/assets/images/renderings/wall.png",
      "width": 50,
      "height": 50,
      "hardware": {
        "3-15-1606": {},
        "3-85-104": {},
        "3-85-109": {}
      }
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
      "hardware": {
        "3-15-1606": {},
        "3-85-104": {},
        "3-85-109": {},
        "3-85-107": {},
        "3-85-108": {},
        "3-85-105": {},
        "3-15-1674": {},
        "3-15-1675": {},
        "3-15-0842": {},
        "3-85-102": {} //zipties
      }
    },
    "4": {
      "feature_type": 4,
      "name": "ceiling",
      "title": "Ceiling Feature",
      "image": "/assets/images/renderings/ceiling.png",
      "width": 50,
      "height": 50,
      "hardware": {
        "3-85-107": {},
        "3-85-108": {},
        "3-85-105": {},
        "3-15-1674": {},
        "3-15-1675": {},
        "3-15-0842": {},
        "3-85-102": {} //zipties
      }
    },
  };

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    this.syd_t = require( 'syd-tessellation' );
    this.syd_v = require( 'syd-visualization' );
    this.debug = require( 'debug' )('feature');

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
    this.project_name = feature.project_name;
    this.specifier = feature.specifier;
    this.width = feature.width;
    this.height = feature.height;
    this.radius = feature.radius;
    this.angle = feature.angle;
    this.ceiling_length = feature.ceiling_length;
    this.tessellation = feature.tessellation;
    this.pattern_strength = feature.pattern_strength;
    this.material = feature.material;
    this.sheet_part_id = feature.sheet_part_id;
    this.boxes = feature.boxes;
    this.sheets = feature.sheets;
    this.xml = feature.xml;
    this.acoustic_foam = feature.acoustic_foam;
    this.random_seed = feature.random_seed;
    this.services_amount = feature.services_amount;
    this.estimated_amount = feature.estimated_amount;
    this.quoted = feature.quoted;
    this.archived = feature.archived;
    this.image = this.getFeatureImage(feature.feature_type); // need to get this from the feature_type

    this.reloadVisualization();
  }

  reloadVisualization() {
    // We need to set the random_seed before UpdateFeature()
    if(this.random_seed != undefined) {
      this.debug("RANDOM SEED IS SET.");
      this.debug("Current Random seed: " + this.random_seed);
      this.syd_t.QT.SetRandomSeedValue(this.random_seed);
    }//else{
    //   this.random_seed = this.syd_t.QT.GetRandomSeedValue();
    // }

    var jsonProperties = this.getJsonProperties();

    this.syd_t.QT.SetUserDataPropertiesJSONString(JSON.stringify(jsonProperties));
    this.syd_t.QT.UpdateFeature();

    // Set the random_seed if it's not already set
    if(this.random_seed == undefined) {
      this.debug('RANDOM SEED IS NOT SET');
      this.random_seed = this.syd_t.QT.GetRandomSeedValue();
      this.debug("Current Random seed: " + this.random_seed);
    }

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

  redrawVisualization() {
    var front = this.syd_t.QT.GetFrontSurfacePoints();
    var back = this.syd_t.QT.GetBackSurfacePoints();
    var uNum = this.syd_t.QT.GetU();
    var vNum = this.syd_t.QT.GetV();

    this.syd_v.QT.Visualization.visualizeFeature(front, back, uNum, vNum, this.getMaterialImage(this.material));

    // feature has been updated
    this.onFeatureUpdated.emit();

    // update the XML
    this.xml = this.getXML();
  }

  updateEstimatedAmount() {
    var acousticFoamCost = this.prices['acoustic_foam'];
    var sheetCost = this.prices['felt_sheet'];
    var stapleCost: number = this.prices['staple'];
    var ziptieCost: number = this.prices['ziptie'];
    var magnetCost: number = this.prices['magnet'];
    var backplateCost: number = this.prices['backplate'];
    var baseplateCost: number = this.prices['baseplate'];
    var frameCost: number = this.prices['frame'];

    var columns = this.syd_t.QT.GetU();
    var rows = this.syd_t.QT.GetV();
    if(this.feature_type == 0 || this.feature_type == 1) {
      // double sheet and boxes
      this.sheets = this.syd_t.QT.GetSheets() * 2;
      this.boxes = this.syd_t.QT.GetParts() * 2;
    }else{
      this.sheets = this.syd_t.QT.GetSheets();
      this.boxes = this.syd_t.QT.GetParts();
    }

    // PRODUCTS
    var totalProductsCost = this.sheets * sheetCost;
    if(this.acoustic_foam) {
      totalProductsCost += (acousticFoamCost * this.boxes);
    }

    // HARDWARE
    var totalHardwareCost = this.getHardwareCost(this.feature_type);

    // SERVICES
    var staples: number = this.getStaples(this.feature_type);
    // var zipties: number = this.getZipties(this.feature_type);
    var magnets: number = this.syd_t.QT.GetMagnets();
    var frames: number = this.getFrames(this.feature_type);
    var backplates: number = this.getBackplates(this.feature_type);
    var baseplates: number = this.getBaseplates(this.feature_type);
    var fabricationCost: number = this.getFabricationCost(this.feature_type);

    this.services_amount = (staples * stapleCost) + (magnets * magnetCost) + (backplates * backplateCost) + (baseplates * baseplateCost) + (frames * frameCost) + fabricationCost;

    this.debug("Rows: " + rows);
    this.debug("Columns: " + columns);
    this.debug("boxes: " + this.boxes);
    this.debug("sheets: " + this.sheets);
    this.debug("magnets: " + magnets);
    this.debug("stapleCost: " + stapleCost);
    this.debug("Staples cost: " + (staples * stapleCost));
    // this.debug("Zipties cost: " + (zipties * ziptieCost));
    this.debug("Magnets cost: " + (magnets * magnetCost));
    this.debug("Backplates: " + backplates);
    this.debug("Backplates cost: " + (backplates * backplateCost));
    this.debug("Baseplates: " + baseplates);
    this.debug("Baseplates cost: " + (baseplates * baseplateCost));
    this.debug("Frames: " + frames);
    this.debug("Frames cost: " + (frames * frameCost));
    this.debug("Fabrication cost: " + fabricationCost);
    this.debug("Products cost: " + totalProductsCost);
    this.debug("Hardware cost: " + totalHardwareCost);
    this.debug("Services cost: " + this.services_amount);

    this.estimated_amount = totalProductsCost + totalHardwareCost + this.services_amount;
    return this.estimated_amount;
  }

  updateAcousticFoam(value: boolean) {
    this.acoustic_foam = value;
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
        fabricationCost = (this.getWallBoxes() * wallFab) + (this.getCeilingBoxes() * ceilingFab);
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

  getWallBoxes() {
    var wallRows = this.syd_t.QT.GetWallRows();
    var wallCols = this.syd_t.QT.GetWallColumns();
    this.debug("wall rows: " + wallRows);
    this.debug("wall cols: " + wallCols);

    return wallRows * wallCols;
  }

  getCeilingBoxes() {
    var ceilingRows = this.syd_t.QT.GetCeilingRows();
    var ceilingCols = this.syd_t.QT.GetCeilingColumns();
    this.debug("ceiling rows: " + ceilingRows);
    this.debug("ceiling cols: " + ceilingCols);

    return ceilingRows * ceilingCols;
  }

  getBackplates(feature_type: number) {
    if(feature_type == 2) {
      // wall
      return Math.ceil(Math.ceil(this.boxes/4)/3);
    }else if(feature_type == 3) {
      // wall-to-ceiling
      var wallRows = this.syd_t.QT.GetWallRows();
      var wallCols = this.syd_t.QT.GetWallColumns();
      return Math.ceil(Math.ceil((wallRows * wallCols)/4)/3);
    }else{
      // anything else
      return 0;
    }
  }

  getBaseplates(feature_type: number) {
    if(feature_type == 0 || feature_type == 1) {
      // partitions
      return Math.ceil(this.syd_t.QT.GetU()/3);
    }else{
      return 0;
    }
  }

  getStaples(feature_type: number) {
    if(feature_type == 0 || feature_type == 1) {
      // partitions. we need to double the number of frames
      return this.boxes * 25 * 2;
    }else if(feature_type == 2) {
      // wall
      return this.boxes * 25;
    }else if(feature_type == 3) {
      // wall-to-ceiling
      return this.boxes * 25;
    }else if(feature_type == 4) {
      // ceiling
      return this.boxes * 25;
    }else{
      // anything else
      return this.boxes * 25;
    }
  }

  getZipties(feature_type: number) {
    if(feature_type == 0 || feature_type == 1) {
      // partitions
      return Math.ceil(this.boxes * 12);
    }else if(feature_type == 2) {
      // wall
      return 0;
    }else if(feature_type == 3) {
      // wall-to-ceiling only the ceiling needs ties
      var ceilingRows = this.syd_t.QT.GetCeilingRows();
      var ceilingCols = this.syd_t.QT.GetCeilingColumns();
      var ceilingBoxes = Math.ceil(ceilingRows * ceilingCols);
      return Math.ceil(ceilingBoxes * 24);
    }else if(feature_type == 4) {
      // ceiling
      return Math.ceil(this.boxes * 24);
    }
  }

  getFrames(feature_type: number) {
    if(feature_type == 0 || feature_type == 1) {
      // partitions. we need to double the number of frames
      return Math.ceil(this.boxes/18) * 2;
    }else if(feature_type == 2) {
      // wall
      return Math.ceil(this.boxes/18);
    }else if(feature_type == 3) {
      // wall-to-ceiling
      return Math.ceil(this.boxes/18);
    }else if(feature_type == 4) {
      // ceiling
      return Math.ceil(this.boxes/18);
    }
  }

  getHardwareCost(feature_type: number) {
    // reset hardware array
    this.hardware = [];
    var totalHardwareCost: number = 0.00;
    this.debug('========== FEATURE HARDWARE ===============')
    var hardwares = this.features[feature_type].hardware;
    var size = Object.keys(hardwares).length;
    var qty;
    for (var hardware in hardwares) {
      if(hardwares.hasOwnProperty(hardware)) {
        qty = this.getHardwareQty(feature_type, hardware);
        var hardwareCost = this.prices[hardware] * qty;
        totalHardwareCost += hardwareCost;
        this.debug(hardware);
        this.debug('PRICE: ' + this.prices[hardware]);
        this.debug("QUANTITY: " + qty);
        this.debug("HARDWARE COST: " + hardwareCost);
        var hwpart = {
          "part_id": hardware,
          "qty": qty
        }
        this.hardware.push(hwpart);
      }
    }
    this.debug('========== /FEATURE HARDWARE ===============')
    return totalHardwareCost;
  }

  getHardwareQty(feature_type: number, hardware: string) {
    var hardwareQty: number = 0;
    var columns = this.syd_t.QT.GetU();
    var rows = this.syd_t.QT.GetV();
    switch (hardware) {
      // WALL
      case "3-15-1606":
        hardwareQty = Math.ceil(this.boxes / 4) * 4;
        break;

      case "3-85-104":
        hardwareQty = Math.ceil(this.boxes / 4) * 4;
        break;

      case "3-85-109":
        hardwareQty = Math.ceil(this.boxes / 4) * 4;
        break;
      // END WALL

      // PARTITIONS
      case "3-85-106":
        hardwareQty = columns * 4;
        break;

      // Used in partitions and ceilings
      case "3-15-0842":
        if(feature_type == 0 || feature_type == 1) {
          hardwareQty = this.getBaseplates(feature_type) * 3;
        }else if(feature_type == 3) {
          hardwareQty = Math.ceil(this.syd_t.QT.GetCeilingRows() / 2) * Math.ceil(this.syd_t.QT.GetCeilingColumns() / 2) * 2;
        }else if(feature_type == 4) {
          hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2) * 2;
        }
        break;

      // Used in partitions and ceilings
      case "3-85-105":
        if(feature_type == 0 || feature_type == 1) {
          hardwareQty = columns * 4;
        }else if(feature_type == 3) {
          hardwareQty = Math.ceil(this.syd_t.QT.GetCeilingRows() / 2) * Math.ceil(this.syd_t.QT.GetCeilingColumns() / 2) * 4;
        }else if(feature_type == 4) {
          hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2) * 4;
        }
        break;

      // Used in partitions and ceilings
      case "3-85-102":
        if(feature_type == 0 || feature_type == 1) {
          hardwareQty = Math.ceil(this.boxes * 12);
        }else if(feature_type == 3) {
          var ceilingRows = this.syd_t.QT.GetCeilingRows();
          var ceilingCols = this.syd_t.QT.GetCeilingColumns();
          var ceilingBoxes = Math.ceil(ceilingRows * ceilingCols);
          hardwareQty = Math.ceil(ceilingBoxes * 24);
        }else if(feature_type == 4) {
          hardwareQty = Math.ceil(this.boxes * 24);
        }
        break;

      // CEILINGS
      case "3-85-107":
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;

      case "3-85-108":
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;

      case "3-15-1674":
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;

      case "3-15-1675":
        hardwareQty = Math.ceil(rows / 2) * Math.ceil(columns / 2);
        break;
      // END CEILINGS

      default:
        alert("Unknown hardware part: " + hardware);
        break;
    }
    return hardwareQty;
  }

  getMaterialImage(material: string) {
    return '/assets/images/materials/' + material + '.jpg';
  }

  getMaterialName(material: string) {
    return material.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  getTessellationImage(tessellation: number) {
    return '/assets/images/patterns/' + this.getTessellationName(tessellation).toLowerCase() + '.png';
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
    return accounting.formatMoney(this.estimated_amount);
  }

  getFormattedAcousticFoam() {
    return this.acoustic_foam ? "Yes" : "No";
  }

  getFormattedServicesAmount() {
    var accounting = require( 'accounting' );
    return accounting.formatMoney(this.services_amount);
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
    this.debug(properties);

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
      xw.endElement('user');
    }

    xw.startElement('order');

      xw.startElement('orderDate');
      xw.text('2017-01-22'); //TO DO: insert order date here
      xw.endElement('orderDate');
      // TO DO: add the products price, hardware price and services price
      xw.startElement('price');
      xw.text(this.estimated_amount);
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
