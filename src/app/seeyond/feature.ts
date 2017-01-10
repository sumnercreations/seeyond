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
  }
}
