import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTareaPage } from './edit-tarea.page';

describe('EditTareaPage', () => {
  let component: EditTareaPage;
  let fixture: ComponentFixture<EditTareaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
