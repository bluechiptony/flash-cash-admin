import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketResponseModalComponent } from './ticket-response-modal.component';

describe('TicketResponseModalComponent', () => {
  let component: TicketResponseModalComponent;
  let fixture: ComponentFixture<TicketResponseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketResponseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketResponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
