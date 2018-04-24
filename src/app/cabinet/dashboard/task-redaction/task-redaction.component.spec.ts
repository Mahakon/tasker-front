import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRedactionComponent } from './task-redaction.component';

describe('TaskRedactionComponent', () => {
  let component: TaskRedactionComponent;
  let fixture: ComponentFixture<TaskRedactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRedactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRedactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
