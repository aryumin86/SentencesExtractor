/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WordFormsModalComponent } from './word-forms-modal.component';

describe('WordFormsModalComponent', () => {
  let component: WordFormsModalComponent;
  let fixture: ComponentFixture<WordFormsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordFormsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordFormsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
