import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysTransactionsOverviewComponent } from './todays-transactions-overview.component';

describe('TodaysTransactionsOverviewComponent', () => {
  let component: TodaysTransactionsOverviewComponent;
  let fixture: ComponentFixture<TodaysTransactionsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysTransactionsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysTransactionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
