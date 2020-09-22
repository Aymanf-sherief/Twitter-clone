import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {
  data = 'test data';
  tweets: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
     const headers: HttpHeaders = new HttpHeaders({ Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo5LCJ1c2VybmFtZSI6ImF5bWFuIiwiZXhwIjoxNjAzMTc4NjI2LCJlbWFpbCI6ImF5bWFuQGVtYWlsLmNvbSIsIm9yaWdfaWF0IjoxNjAwNTg2NjI2fQ.5VmZL2VHbVONm9ceft1Y8WgGpMWAseWEq46PBMqPYuI' });
     const options = {
       headers,
       responseType: 'json' as const
     };
     this.http.get('http://localhost:8000/api/tweets/', options).subscribe((data) => this.tweets = JSON.stringify(data));

  }

}
