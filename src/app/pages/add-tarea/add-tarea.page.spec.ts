import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTareaPage } from './add-tarea.page';

describe('AddTareaPage', () => {
  let component: AddTareaPage;
  let fixture: ComponentFixture<AddTareaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
