import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  public API = 'https://thawing-chamber-47973.herokuapp.com';
  public OWNER_API = this.API + '/owners';

  getAll(): Observable<any> {
    return this.http.get(this.OWNER_API);
  }
}
