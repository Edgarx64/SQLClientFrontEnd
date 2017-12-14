import { Component } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public query: string;
  public result: string;
  public title = 'SQL Client';
  constructor(private http: Http) {
    this.query = 'SELECT a, b, c\n' +
      'FROM mycol\n' +
      'WHERE b > 10\n' +
      'GROUP BY a\n' +
      'ORDER BY a ASC\n' +
      'SKIP 1\n' +
      'LIMIT 10';
  }
  onSubmit() {
    this.http.get('http://localhost:8080/get?query=' + this.query.replace(/\n/g, ' '))
      .subscribe((res: any) => {
        const obj = JSON.parse(res._body);
        this.result = JSON.stringify(obj, undefined, 4);
      }, (err: any) => {
        const obj = JSON.parse(err._body);
        this.result = obj.message;
      });
  }
}
