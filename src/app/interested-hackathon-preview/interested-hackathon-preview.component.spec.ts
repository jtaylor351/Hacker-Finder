import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedHackathonPreviewComponent } from './interested-hackathon-preview.component';

describe('InterestedHackathonPreviewComponent', () => {
  let component: InterestedHackathonPreviewComponent;
  let fixture: ComponentFixture<InterestedHackathonPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestedHackathonPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestedHackathonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
