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
  constructor(public hackathonService: HackathonService, private router: Router) { }

  ngOnInit() {
    const new_url = this.router.url;
    this.hackathonService.getHackathon(new_url)
      .subscribe(res => { this.newHackathon = res; this.loaded = true; });
  }

}
