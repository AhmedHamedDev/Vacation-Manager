import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCheckInsComponent } from './user-check-ins.component';

describe('UserCheckInsComponent', () => {
  let component: UserCheckInsComponent;
  let fixture: ComponentFixture<UserCheckInsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCheckInsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCheckInsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
