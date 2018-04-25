import { json } from 'ng2-validation/dist/json';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
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
                const hackathon = response.json().hackathon;
                return hackathon;
            });
  }


  getHackathons() {
    return this.http.get('http://localhost:3000/home')
            .map((response: Response) => {
                const hackathons = response.json().obj;
                const transformedHackathons: Hackathon[] = [];
                for (const x of hackathons) {
                  console.log(x);
                  transformedHackathons.push(new Hackathon(
                    x.title, x.location, x.description,
                    x.startDate, x.endDate, x.universityHost,
                    x.universityPicture, x.hackathonUrl));
                }
                console.log(transformedHackathons);
                this.hackathons = transformedHackathons;
                return transformedHackathons;
            })
            .catch((error: Response) => Observable.throw(error.json()));
  }

  getInterestedHackathons(userId: string) {
    const params = new URLSearchParams();
    params.append('users', userId);
    return this.http.get('http://localhost:3000/user/interested-hackathons', {search: params})
            .map((response: Response) => {
                console.log('you got here');
                console.log(response.json());
                const hackathons = response.json().interestedHacks;
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

  getGoingUsers(userIds: string[]) {
    const params = new URLSearchParams();
    userIds.forEach(function(x) {
      params.append('users', x);
    });
    return this.http.get('http://localhost:3000/hackathon/interested-users',
    {search: params})
              .map((response: Response) => {
              if (response.json().users == null) {
                return [];
              }
              const users = response.json().users;
              const transformedGoingUsers: User[] = [];
              console.log('almost transformed users');
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

  addGoing(hackathon: Hackathon, userId: String) {
    const hack = JSON.stringify(hackathon);
    const body = JSON.stringify({title: hackathon.title, userId: userId});
    console.log(hackathon);
    console.log(userId);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
    return this.http.post('http://localhost:3000/user/interested-hackathons', body, {headers: headers})
      .map((response: Response) => {
                response.json();
                this.submissionSuccess = true;
                console.log(response);
            })
            .catch((error: Response) => Observable.throw(error.json));
  }
}
