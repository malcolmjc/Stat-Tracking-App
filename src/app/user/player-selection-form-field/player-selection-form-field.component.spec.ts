import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { PlayerSelectionFormFieldComponent } from './player-selection-form-field.component';

@Component({
  template: `
    <app-player-selection-form-field
      [playerNames]="playerNames">
    </app-player-selection-form-field>`
})
class TestComponent {
  @ViewChild(PlayerSelectionFormFieldComponent) public component: PlayerSelectionFormFieldComponent;
  public playerNames = ['player1', 'player2', 'player3'];
}

describe('PlayerSelectionFormFieldComponent', () => {
  let component: PlayerSelectionFormFieldComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [
        PlayerSelectionFormFieldComponent,
        TestComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    component = testComponent.component;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit behavior', () => {
    test('should initialize filtered players to playernames', () => {
      expect(component.playerNames).toEqual(testComponent.playerNames);
      expect(component.filteredPlayers).toEqual(testComponent.playerNames);
    });

    test('should filter playerNames on value changes', () => {
      component.playerControl.setValue(testComponent.playerNames[0]);
      expect(component.filteredPlayers).toEqual([testComponent.playerNames[0]]);
    });

    test('should be able to filter multiple times', () => {
      component.playerControl.setValue(testComponent.playerNames[0]);
      expect(component.filteredPlayers).toEqual([testComponent.playerNames[0]]);

      component.playerControl.setValue(testComponent.playerNames[1]);
      expect(component.filteredPlayers).toEqual([testComponent.playerNames[1]]);

      component.playerControl.setValue(testComponent.playerNames[2]);
      expect(component.filteredPlayers).toEqual([testComponent.playerNames[2]]);
    });

    test('filtering does not affect root playerNames', () => {
      component.playerControl.setValue(testComponent.playerNames[0]);
      expect(component.playerNames.length).toEqual(testComponent.playerNames.length);
      expect(component.filteredPlayers.length).toEqual(1);
    });
  });

  describe('form field errors', () => {
    test('error occurs when name not one of the playerNames', () => {
      component.playerControl.setValue('not-found');
      expect(component.playerControl.invalid).toBeTruthy();
      expect(component.playerControl.errors && component.playerControl.errors.forbiddenName).toBeTruthy();
    });

    test('error occurs when no name is searched', () => {
      component.playerControl.setValue('');
      expect(component.playerControl.invalid).toBeTruthy();
      expect(component.playerControl.errors && component.playerControl.errors.required).toBeTruthy();
    });
  });

  test('can select players', () => {
    jest.spyOn(component, 'selectPlayer');
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('focusin')); // need to select input
    fixture.detectChanges();

    const playerElems = fixture.debugElement.queryAll(By.css('mat-option'));
    playerElems.forEach((elem) => {
      elem.nativeElement.click();
      expect(component.selectPlayer).toHaveBeenCalled();
      expect(component.selectedUsername === elem.nativeElement.textContent.trim());
    });
  });
});
