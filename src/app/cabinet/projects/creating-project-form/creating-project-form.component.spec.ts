import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingProjectFormComponent } from './creating-project-form.component';

describe('CreatingProjectFormComponent', () => {
  let component: CreatingProjectFormComponent;
  let fixture: ComponentFixture<CreatingProjectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatingProjectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatingProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
