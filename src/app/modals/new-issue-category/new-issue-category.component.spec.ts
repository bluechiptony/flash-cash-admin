import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIssueCategoryComponent } from './new-issue-category.component';

describe('NewIssueCategoryComponent', () => {
  let component: NewIssueCategoryComponent;
  let fixture: ComponentFixture<NewIssueCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewIssueCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewIssueCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
