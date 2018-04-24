import { User } from '../auth/user.model';
import { Component, Input, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {

  @Input() goingUsers: User[];
  constructor(private http: Http) { }

  ngOnInit() {
  }

  connect(user: User) {
    const body = {requestee_email: user.email, requester_id: localStorage.getItem('userId')};
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:3000/user/connect' + token, body, {headers: headers})
            .map((response: Response) => {
                response.json();
            })
            .catch((error: Response) => Observable.throw(error.json));
  }

}
