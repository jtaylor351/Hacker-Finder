import { Injectable } from '@angular/core';
import { User } from './auth/user.model';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService {

  requestedUsers: User[] = [];
  constructor(private http: Http) { }

  getRequestedUsers(userId: User) {
    return this.http.get('http://localhost:3000/home/profile/requested',
    {params: {userId: userId}})
              .map((response: Response) => {
              const requestedUsers = response.json().obj;
              const tranRequestedUsers: User[] = [];
              for (const x of requestedUsers) {
                tranRequestedUsers.push(new User(
                  x.firstName, x.lastName, null,
                  x.email, x.connections, x.hackathons, x.university, x.picture, x.bio));
              }
              this.requestedUsers = tranRequestedUsers;
              return tranRequestedUsers;
              })
              .catch((error: Response) => Observable.throw(error.json()));
  }
}
