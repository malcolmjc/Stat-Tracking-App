import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { PlayerSelectionFormFieldComponent } from './player-selection-form-field.component';

describe('PlayerSelectionFormFieldComponent', () => {
  let component: PlayerSelectionFormFieldComponent;
  let fixture: ComponentFixture<PlayerSelectionFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [ PlayerSelectionFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSelectionFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
