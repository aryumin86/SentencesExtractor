/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SentencesAppComponent } from './sentences-app.component';

describe('SentencesAppComponent', () => {
  let component: SentencesAppComponent;
  let fixture: ComponentFixture<SentencesAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentencesAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentencesAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
