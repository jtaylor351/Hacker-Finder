import { Hackathon } from '../hackathon/hackathon.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hackathon-preview',
  templateUrl: './hackathon-preview.component.html',
  styleUrls: ['./hackathon-preview.component.css']
})
export class HackathonPreviewComponent implements OnInit {
  @Input() hackathon: Hackathon;
  constructor() { }

  ngOnInit() {
  }

  going(hackathon: Hackathon) {
    
  }

}
