import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJppliedJobsComponent } from './view-jpplied-jobs.component';

describe('ViewJppliedJobsComponent', () => {
  let component: ViewJppliedJobsComponent;
  let fixture: ComponentFixture<ViewJppliedJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewJppliedJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJppliedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
