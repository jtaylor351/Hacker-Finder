import { Component, Input, OnInit } from '@angular/core';
import { Hackathon } from './../hackathon/hackathon.model';

@Component({
  selector: 'app-interested-hackathon-preview',
  templateUrl: './interested-hackathon-preview.component.html',
  styleUrls: ['./interested-hackathon-preview.component.css']
})
export class InterestedHackathonPreviewComponent implements OnInit {
  @Input() interestedHackathons: Hackathon[];
  constructor() { }

  ngOnInit() {
  }

}
