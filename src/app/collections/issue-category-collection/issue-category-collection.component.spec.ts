import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCategoryCollectionComponent } from './issue-category-collection.component';

describe('IssueCategoryCollectionComponent', () => {
  let component: IssueCategoryCollectionComponent;
  let fixture: ComponentFixture<IssueCategoryCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueCategoryCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCategoryCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
