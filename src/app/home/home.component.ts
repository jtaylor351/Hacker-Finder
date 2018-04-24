import { HackathonService } from '../hackathon.service';
import { Hackathon } from '../hackathon/hackathon.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public hackathonService: HackathonService) { }
  hackathons: Hackathon[];
  interestedHackathons: Hackathon[];
  ngOnInit() {
    this.hackathonService.getHackathons()
      .subscribe(res => { this.hackathons = res; });

    this.hackathonService.getInterestedHackathons(localStorage.getItem('userId'))
      .subscribe(res => { this.interestedHackathons = res; });
  }

  // gettingHackathons() {
  //   this.hackathonService.getHackathons()
  //     .subscribe(res => { this.hackathons = res; });
  // }

  // gettingInterestedHackathons() {
  //   this.hackathonService.getInterestedHackathons(localStorage.getItem('userId'))
  //     .subscribe(res => { this.interestedHackathons = res; });
  // }
}
