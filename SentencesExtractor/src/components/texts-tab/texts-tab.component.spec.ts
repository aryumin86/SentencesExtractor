/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TextsTabComponent } from './texts-tab.component';

describe('TextsTabComponent', () => {
  let component: TextsTabComponent;
  let fixture: ComponentFixture<TextsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
