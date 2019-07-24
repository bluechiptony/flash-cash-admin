import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuesCategoryCollectionComponent } from './issues-category-collection.component';

describe('IssuesCategoryCollectionComponent', () => {
  let component: IssuesCategoryCollectionComponent;
  let fixture: ComponentFixture<IssuesCategoryCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssuesCategoryCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesCategoryCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
