import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCloseModalComponent } from './ticket-close-modal.component';

describe('TicketCloseModalComponent', () => {
  let component: TicketCloseModalComponent;
  let fixture: ComponentFixture<TicketCloseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketCloseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCloseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
