import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesCategoriesComponent } from './issues-categories.component';

describe('IssuesCategoriesComponent', () => {
  let component: IssuesCategoriesComponent;
  let fixture: ComponentFixture<IssuesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
