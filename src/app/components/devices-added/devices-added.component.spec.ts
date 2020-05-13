import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesAddedComponent } from './devices-added.component';

describe('DevicesAddedComponent', () => {
  let component: DevicesAddedComponent;
  let fixture: ComponentFixture<DevicesAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
