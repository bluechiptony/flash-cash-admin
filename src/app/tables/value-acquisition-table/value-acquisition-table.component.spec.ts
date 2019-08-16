import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueAcquisitionTableComponent } from './value-acquisition-table.component';

describe('ValueAcquisitionTableComponent', () => {
  let component: ValueAcquisitionTableComponent;
  let fixture: ComponentFixture<ValueAcquisitionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValueAcquisitionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueAcquisitionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
