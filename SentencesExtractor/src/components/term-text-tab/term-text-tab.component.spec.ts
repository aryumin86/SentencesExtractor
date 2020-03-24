/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TermTextTabComponent } from './term-text-tab.component';

describe('TermTextTabComponent', () => {
  let component: TermTextTabComponent;
  let fixture: ComponentFixture<TermTextTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermTextTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermTextTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
