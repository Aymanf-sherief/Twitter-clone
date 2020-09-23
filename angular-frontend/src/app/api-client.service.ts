import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  options: object;
  API_ROOT = environment.api_root;

  constructor(private http: HttpClient) {
    this.options = {
      headers: {Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6ImF5bWFuIiwiZXhwIjoxNjAzMTc4NjI2LCJlbWFpbCI6ImF5bWFuQGVtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjAwNTg2NjI2fQ.5VmZL2VHbVONm9ceft1Y8WgGpMWAseWEq46PBMqPYuI'},
      responseType: 'json' as const,
    };
  }
  getTweets(): Observable<object> {
    return this.http.get(`${this.API_ROOT}/tweets/`, this.options);
  }
}
