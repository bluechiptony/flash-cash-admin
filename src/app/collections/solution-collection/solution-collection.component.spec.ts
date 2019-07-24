import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionCollectionComponent } from './solution-collection.component';

describe('SolutionCollectionComponent', () => {
  let component: SolutionCollectionComponent;
  let fixture: ComponentFixture<SolutionCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
