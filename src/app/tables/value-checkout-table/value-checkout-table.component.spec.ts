import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCheckoutTableComponent } from './value-checkout-table.component';

describe('ValueCheckoutTableComponent', () => {
  let component: ValueCheckoutTableComponent;
  let fixture: ComponentFixture<ValueCheckoutTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueCheckoutTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueCheckoutTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
