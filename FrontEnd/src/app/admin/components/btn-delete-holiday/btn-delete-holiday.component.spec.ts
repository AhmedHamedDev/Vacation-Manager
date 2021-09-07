import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDeleteHolidayComponent } from './btn-delete-holiday.component';

describe('BtnDeleteHolidayComponent', () => {
  let component: BtnDeleteHolidayComponent;
  let fixture: ComponentFixture<BtnDeleteHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnDeleteHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnDeleteHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
