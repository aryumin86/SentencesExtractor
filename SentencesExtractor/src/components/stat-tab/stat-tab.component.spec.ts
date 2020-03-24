/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StatTabComponent } from './stat-tab.component';

describe('StatTabComponent', () => {
  let component: StatTabComponent;
  let fixture: ComponentFixture<StatTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
