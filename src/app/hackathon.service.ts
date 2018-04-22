import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { User } from './auth/user.model';

@Injectable()
export class HackathonService {

  constructor(private http: Http) { }

  getHackathons(userId: User) {
    return userId;
  }

}
