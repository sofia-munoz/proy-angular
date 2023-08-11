import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  FBurlBase: string;
  FBpageId: string;
  FBaccessToken: string;
  constructor(private _http: HttpClient) {
    this.FBurlBase = "https://graph.facebook.com/";
    this.FBpageId = "107240362431621";
    this.FBaccessToken = "EAAIm7lFPjaEBAJm8WutOvqBPCo5GUDpZBDk9HaU1ma5BIcCupQ3YF9DLzefclwZAgLc2PML6hHoVMwzW40NtNcl3zUFMYmbcJE2s2XL4cerl0LZAeAjZCQhFL9fgdPiiZANfasSLq841Q4364b4K6T0poqu5yZCv5EBLL2fzzPJCWbYlERrOsv";
  }

  public postearAnuncioImgFB(message: string, url: string): Observable<any> {
    let params = new HttpParams().set("access_token", this.FBaccessToken);
    if (message != null) {
      params = params.set("message", message);
    }
    if (url != null) {
      params = params.set("url", url);
    }
    return this._http.post(this.FBurlBase + this.FBpageId + "/photos", null, { params: params });
  }

  public postearAnuncioFB(message: string): Observable<any> {
    let params = new HttpParams()
      .set("access_token", this.FBaccessToken)
      .set("message", message);
      
    return this._http.post(this.FBurlBase + "/v17.0/" + this.FBpageId + "/feed", null, { params: params });
  }
  

  public getAnunciosFB(): Observable<any> {
    const params = {
      access_token: this.FBaccessToken
    };
    return this._http.get(this.FBurlBase + this.FBpageId + "/feed", {params});
  }
}
