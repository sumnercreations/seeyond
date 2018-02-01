import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Feature } from '../feature';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {User} from "../_models/user";

@Injectable()
export class SeeyondService {
  onSaved = new EventEmitter();
  onLoaded = new EventEmitter();
  apiUrl = 'https://' + environment.API_URL + '/seeyonds/';
  private debug;

  constructor(
    private http: Http,
    private feature: Feature,
    private user: User
  ) {
    this.debug = require( 'debug' )('seeyond-service');
  }

  getMyFeatures() {
    return this.http.get(this.apiUrl + 'list/' + this.user.uid)
      .map((res: Response) => res.json())
      .catch(this.handleError)
  }

  loadFeature(id: number) {
    this.debug('Loading Feature');
    return this.http.get(this.apiUrl + id)
      .map((res: Response) => {
        this.debug(res.json());
        this.onLoaded.emit();
        this.debug("emitting onLoaded");
        return res.json();
      })
      .catch(this.handleError);
  }

  updateFeature() {
    this.debug(this.feature.hardware);
    let hardware = JSON.stringify({hardware: this.feature.hardware});
    this.debug(hardware)
    let patchData = {
      "id": this.feature.id,
      "uid": this.user.uid,
      "feature_type": this.feature.feature_type,
      "title": this.feature.title,
      "name": this.feature.name,
      "design_name": this.feature.design_name,
      "project_name": this.feature.project_name,
      "specifier": this.feature.specifier,
      "units": this.feature.units,
      "width": this.feature.width,
      "height": this.feature.height,
      "radius": this.feature.radius,
      "angle": this.feature.angle,
      "ceiling_length": this.feature.ceiling_length,
      "depth": this.feature.depth,
      "tessellation": this.feature.tessellation,
      "pattern_strength": this.feature.pattern_strength,
      "material": this.feature.material,
      "sheet_part_id": this.feature.sheet_part_id,
      "boxsize": this.feature.boxsize,
      "boxes": this.feature.boxes,
      "sheets": this.feature.sheets,
      "xml": this.feature.xml,
      "cove_lighting": this.feature.cove_lighting,
      "random_seed": this.feature.random_seed,
      "services_amount": this.feature.services_amount,
      "estimated_amount": this.feature.estimated_amount,
      "quoted": this.feature.quoted,
      "archived": this.feature.archived,
      "hardware": this.feature.hardware
    };
    this.debug(patchData);
    let headers = new Headers({"Content-Type": "application/json"});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(this.apiUrl + this.feature.id, patchData, options)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug("emitting onSaved");
        return res.json() || {}
      })
      .catch(this.handleError);
  }

  saveFeature() {
    let patchData = {
      "uid": this.user.uid,
      "feature_type": this.feature.feature_type,
      "title": this.feature.title,
      "name": this.feature.name,
      "design_name": this.feature.design_name,
      "project_name": this.feature.project_name,
      "specifier": this.feature.specifier,
      "units": this.feature.units,
      "width": this.feature.width,
      "height": this.feature.height,
      "radius": this.feature.radius,
      "angle": this.feature.angle,
      "ceiling_length": this.feature.ceiling_length,
      "depth": this.feature.depth,
      "tessellation": this.feature.tessellation,
      "pattern_strength": this.feature.pattern_strength,
      "material": this.feature.material,
      "sheet_part_id": this.feature.sheet_part_id,
      "boxsize": this.feature.boxsize,
      "boxes": this.feature.boxes,
      "sheets": this.feature.sheets,
      "xml": this.feature.xml,
      "cove_lighting": this.feature.cove_lighting,
      "random_seed": this.feature.random_seed,
      "services_amount": this.feature.services_amount,
      "estimated_amount": this.feature.estimated_amount,
      "quoted": this.feature.quoted,
      "archived": this.feature.archived,
      "hardware": this.feature.hardware
    };

    return this.http.post(this.apiUrl, patchData)
      .map((res: Response) => {
        this.onSaved.emit();
        this.debug("emitting onSaved");
        return res.json() || {}
      })
      .catch(this.handleError);
  }

  deleteFeature(id: number) {
    return this.http.delete(this.apiUrl + id)
  }

  sendEmail() {
    return this.http.get(this.apiUrl + 'email/' + this.user.uid + '/feature/' + this.feature.id)
      .map((res: Response) => res.json())
      .catch(this.handleError)
  }

  getPrices() {
    return this.http.get(this.apiUrl + 'prices')
      .map((res: Response) => res.json())
      .catch(this.handleError)
  }

  private handleError(error: any) {
    let errorJson = error.json();
    if (errorJson) {
      return Observable.throw(errorJson.message || 'Server Error');
    }

    return Observable.throw('Unknown Error');
  }


}
