import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private _apiUrl: string = environment.apiUrl;
  private _siteKey: string = environment.siteKey;

  constructor() {}

  get apiUrl(): string {
    return this._apiUrl;
  }

  set apiUrl(value: string) {
    this._apiUrl = value;
  }

  get siteKey(): string {
    return this._siteKey;
  }

  set siteKey(value: string) {
    this._siteKey = value;
  }
}
