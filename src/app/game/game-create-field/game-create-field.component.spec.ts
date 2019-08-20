import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';

import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';

import { GameCreateFieldComponent } from './game-create-field.component';
import { StatType } from '../stat-types-enum';

let onStatChangedResult: { statType: StatType, statCount: number } = null;
@Component({
  template:
    `<app-game-create-field
      [statType]="statType"
      [statTitle]="statTitle"
      [statCount]="statCount"
      (statChanged)="onStatChanged($event)">
    </app-game-create-field>`
})
class TestComponent {
  @ViewChild(GameCreateFieldComponent) public component: GameCreateFieldComponent;

  public statType: StatType = StatType.catches;
  public statTitle = 'statTitle';
  public statCount = 13;

  public onStatChanged(event: { statType: StatType, statCount: number }) {
    onStatChangedResult = event;
  }
}
describe('GameCreateFieldComponent', () => {
  let component: GameCreateFieldComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatRadioModule
      ],
      declarations: [
        GameCreateFieldComponent,
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

  describe('should set inputs', () => {
    test('sets statType', () => {
      expect(component.statType).toEqual(testComponent.statType);
    });

    test('sets statTitle', () => {
      expect(component.statTitle).toEqual(testComponent.statTitle);
    });

    test('sets statCount', () => {
      expect(component.statCount).toEqual(testComponent.statCount);
    });
  });

  describe('onPositiveClicked method', () => {
    test('increments statCount', () => {
      component.statCount = 0;
      const plusButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
      plusButton.click();
      expect(component.statCount).toEqual(1);
      expect(onStatChangedResult.statCount).toEqual(1);
    });

    test('increments statCount multiple times', () => {
      component.statCount = 0;
      const plusButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
      plusButton.click();
      expect(component.statCount).toEqual(1);
      expect(onStatChangedResult.statCount).toEqual(1);
      plusButton.click();
      plusButton.click();
      expect(component.statCount).toEqual(3);
      expect(onStatChangedResult.statCount).toEqual(3);
    });
  });

  describe('onNegativeClicked method', () => {
    test('decrements statCount', () => {
      component.statCount = 1;
      const minusButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
      minusButton.click();
      expect(component.statCount).toEqual(0);
      expect(onStatChangedResult.statCount).toEqual(0);
    });

    test('decrements statCount multiple times', () => {
      component.statCount = 3;
      const minusButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
      minusButton.click();
      expect(component.statCount).toEqual(2);
      expect(onStatChangedResult.statCount).toEqual(2);
      minusButton.click();
      minusButton.click();
      expect(component.statCount).toEqual(0);
      expect(onStatChangedResult.statCount).toEqual(0);
    });

    test('will not decrement below 0', () => {
      component.statCount = 1;
      const minusButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
      minusButton.click();
      expect(component.statCount).toEqual(0);
      expect(onStatChangedResult.statCount).toEqual(0);
      minusButton.click();
      expect(component.statCount).toEqual(0);
      expect(onStatChangedResult.statCount).toEqual(0);
      minusButton.click();
      expect(component.statCount).toEqual(0);
      expect(onStatChangedResult.statCount).toEqual(0);
    });
  });
});
