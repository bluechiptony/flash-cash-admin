import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysUsersOverviewComponent } from './todays-users-overview.component';

describe('TodaysUsersOverviewComponent', () => {
  let component: TodaysUsersOverviewComponent;
  let fixture: ComponentFixture<TodaysUsersOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysUsersOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysUsersOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
