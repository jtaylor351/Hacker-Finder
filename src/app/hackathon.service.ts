import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User } from './auth/user.model';
import { Observable } from 'rxjs/Rx';
import { Hackathon } from './hackathon/hackathon.model';

@Injectable()
export class HackathonService {

  hackathons: Hackathon[] = [];
  goingUsers: User[];
  constructor(private http: Http) { }

  getHackathons() {
    return this.http.get('http://localhost:3000/home')
            .map((response: Response) => {
                const hackathons = response.json().obj;
                const transformedHackathons: Hackathon[] = [];
                for (const x of hackathons) {
                  transformedHackathons.push(new Hackathon(
                    x.title, x.location, x.description,
                    x.startDay, x.length, x.universityHost,
                    x.universityPicture));
                }
                this.hackathons = transformedHackathons;
                return transformedHackathons;
            })
            .catch((error: Response) => Observable.throw(error.json()));
  }

  getGoingUsers(userIds: String[]) {
    return this.http.get('http://localhost:3000/home/hackathon',
    {params: {userIds: userIds}})
              .map((response: Response) => {
              const users = response.json().obj;
              const transformedGoingUsers: User[] = [];
              for (const x of users) {
                transformedGoingUsers.push(new User(
                  x.firstName, x.lastName, x.password, x.email,
                  null, x.university, x.picture, x.bio));
              }
                this.goingUsers = transformedGoingUsers;
                return transformedGoingUsers;
    })
              .catch((error: Response) => Observable.throw(error.json()));
}
