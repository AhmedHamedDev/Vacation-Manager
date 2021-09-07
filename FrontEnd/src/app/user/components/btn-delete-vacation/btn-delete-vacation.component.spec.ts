import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnDeleteVacationComponent } from './btn-delete-vacation.component';

describe('BtnDeleteVacationComponent', () => {
  let component: BtnDeleteVacationComponent;
  let fixture: ComponentFixture<BtnDeleteVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnDeleteVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnDeleteVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
