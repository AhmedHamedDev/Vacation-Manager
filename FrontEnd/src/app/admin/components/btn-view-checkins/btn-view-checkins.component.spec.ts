import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnViewCheckinsComponent } from './btn-view-checkins.component';

describe('BtnViewCheckinsComponent', () => {
  let component: BtnViewCheckinsComponent;
  let fixture: ComponentFixture<BtnViewCheckinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnViewCheckinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnViewCheckinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
