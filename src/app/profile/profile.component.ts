import { Hackathon } from '../hackathon/hackathon.model';
import { UserService } from '../user.service';
import { User } from '../auth/user.model';
import { Component, OnInit } from '@angular/core';
import { HackathonService } from '../hackathon.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loaded = false;
  user: User;
  interestedHackathons: Hackathon[];
  constructor(public userService: UserService, public hackathonService: HackathonService) { }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem('userId'))
      .subscribe(res => {this.user = res; this.loaded = true; });

    this.hackathonService.getInterestedHackathons(localStorage.getItem('userId'))
      .subscribe(res => { this.interestedHackathons = res; });
  }

}
