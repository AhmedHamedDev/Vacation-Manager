import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnViewVacationsComponent } from './btn-view-vacations.component';

describe('BtnViewVacationsComponent', () => {
  let component: BtnViewVacationsComponent;
  let fixture: ComponentFixture<BtnViewVacationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnViewVacationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnViewVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
