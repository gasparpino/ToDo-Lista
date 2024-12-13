import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarViewPage } from './calendar-view.page';

describe('CalendarViewPage', () => {
  let component: CalendarViewPage;
  let fixture: ComponentFixture<CalendarViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CalendarViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
