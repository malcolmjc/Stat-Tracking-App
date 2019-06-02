import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSelectionFormFieldComponent } from './player-selection-form-field.component';

describe('PlayerSelectionFormFieldComponent', () => {
  let component: PlayerSelectionFormFieldComponent;
  let fixture: ComponentFixture<PlayerSelectionFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
