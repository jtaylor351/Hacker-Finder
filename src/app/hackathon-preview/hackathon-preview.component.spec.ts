import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonPreviewComponent } from './hackathon-preview.component';

describe('HackathonPreviewComponent', () => {
  let component: HackathonPreviewComponent;
  let fixture: ComponentFixture<HackathonPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HackathonPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HackathonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
