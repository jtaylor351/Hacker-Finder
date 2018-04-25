import { HackathonService } from '../hackathon.service';
import { Hackathon } from '../hackathon/hackathon.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hackathon-preview',
  templateUrl: './hackathon-preview.component.html',
  styleUrls: ['./hackathon-preview.component.css']
})
export class HackathonPreviewComponent implements OnInit {
  @Input() hackathons: Hackathon[];
  constructor(public hackathonService: HackathonService) { }

  ngOnInit() {
  }

  going(hackathon: Hackathon) {
    this.hackathonService.addGoing(hackathon, localStorage.getItem('userId'))
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      );
  }

}
