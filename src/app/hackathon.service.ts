import { json } from 'ng2-validation/dist/json';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User } from './auth/user.model';
import { Observable } from 'rxjs/Rx';
import { Hackathon } from './hackathon/hackathon.model';

@Injectable()
export class HackathonService {
  submissionSuccess = false;
  hackathons: Hackathon[] = [];
  goingUsers: User[];
  constructor(private http: Http) { }


  getHackathon(url: string) {
        return this.http.get('http://localhost:3000' + url)
            .map((response: Response) => {
                const hackathon = response.json().obj;
                console.log(hackathon);
                return hackathon;
            });
  }


  getHackathons() {
    return this.http.get('http://localhost:3000/home')
            .map((response: Response) => {
                const hackathons = response.json().obj;
                const transformedHackathons: Hackathon[] = [];
                for (const x of hackathons) {
                  transformedHackathons.push(new Hackathon(
                    x.title, x.location, x.description,
                    x.startDay, x.length, x.universityHost,
                    x.universityPicture, x.hackathonUrl));
                }
                this.hackathons = transformedHackathons;
                return transformedHackathons;
            })
            .catch((error: Response) => Observable.throw(error.json()));
  }

  getInterestedHackathons(userId: String) {
    return this.http.get('http://localhost:3000/home')
            .map((response: Response) => {
                const hackathons = response.json().obj;
                const transformedHackathons: Hackathon[] = [];
                for (const x of hackathons) {
                  transformedHackathons.push(new Hackathon(
                    x.title, x.location, x.description,
                    x.startDay, x.length, x.universityHost,
                    x.universityPicture, x.hackathonUrl));
                }
                this.hackathons = transformedHackathons;
                return transformedHackathons;
            })
            .catch((error: Response) => Observable.throw(error.json()));
  }

  getGoingUsers(userIds: String[]) {
    return this.http.get('http://localhost:3000/hackathon/interested-users',
    {params: {users: userIds}})
              .map((response: Response) => {
              const users = response.json().obj;
              const transformedGoingUsers: User[] = [];
              for (const x of users) {
                transformedGoingUsers.push(new User(
                  x.firstName, x.lastName, x.password, x.email, x.connections,
                  null, x.university, x.picture, x.bio));
              }
                this.goingUsers = transformedGoingUsers;
                return transformedGoingUsers;
    })
              .catch((error: Response) => Observable.throw(error.json()));
  }

  addGoing(hackathon: Hackathon) {
    const body = {hackathon: JSON.stringify(hackathon), userId: localStorage.getItem('userId')};
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post('http://localhost:3000/user/interested-hackathons' + token, body, {headers: headers})
      .map((response: Response) => {
                response.json();
                this.submissionSuccess = true;
            })
            .catch((error: Response) => Observable.throw(error.json));
  }
}
