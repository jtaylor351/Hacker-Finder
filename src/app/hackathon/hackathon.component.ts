import { User } from '../auth/user.model';
import { Hackathon } from './hackathon.model';
import { HackathonService } from '../hackathon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hackathon',
  templateUrl: './hackathon.component.html',
  styleUrls: ['./hackathon.component.css']
})
export class HackathonComponent implements OnInit {

  newHackathon: Hackathon;
  loaded = false;
  goingUsers: User[];
  constructor(public hackathonService: HackathonService, private router: Router) { }

  ngOnInit() {
    const new_url = this.router.url;
    this.hackathonService.getHackathon(new_url)
      .subscribe(res => { this.newHackathon = res; this.loaded = true; });

    this.hackathonService.getGoingUsers(this.newHackathon.users)
      .subscribe(res => { this.goingUsers = res; });
  }

  goToUrl(url: String) {
    this.router.navigateByUrl('' + url);
  }

}
