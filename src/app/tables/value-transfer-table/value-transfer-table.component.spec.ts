import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueTransferTableComponent } from './value-transfer-table.component';

describe('ValueTransferTableComponent', () => {
  let component: ValueTransferTableComponent;
  let fixture: ComponentFixture<ValueTransferTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueTransferTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueTransferTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
