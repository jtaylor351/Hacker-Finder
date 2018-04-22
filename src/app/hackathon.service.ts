import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User } from './auth/user.model';
import { Observable } from 'rxjs/Rx';
import { Hackathon } from './hackathon/hackathon.model';

@Injectable()
export class HackathonService {

  hackathons: Hackathon[] = [];
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

}
