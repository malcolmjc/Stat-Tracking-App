import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild  } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';

import { GameCreateComponent } from './game-create.component';
import { MockFontAwesomeModule } from 'src/app/font-awesome.mock.module';
import { MockGameCreateFieldComponent } from '../game-create-field/game-create-field.component.mock';
import { StatType } from '../stat-types-enum';

let onStatsChangedResult: string = null;
@Component({
  template:
    `<app-game-create
      [index]="index"
      [playerName]="playerName"
      [singlePlayer]="singlePlayer"
      (statsChanged)="onStatsChanged($event)">
    </app-game-create>`
})
class TestComponent {
  @ViewChild(GameCreateComponent) public component: GameCreateComponent;

  public index = 3;
  public playerName = 'testPlayerName';
  public singlePlayer = false;
  public onStatsChanged(playerName: string) {
    onStatsChangedResult = playerName;
  }
}

describe('GameCreateComponent', () => {
  let component: GameCreateComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        MockFontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule
      ],
      declarations: [
        TestComponent,
        GameCreateComponent,
        MockGameCreateFieldComponent
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

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should set listIndex', () => {
    expect(component.getIndex()).toEqual(testComponent.index);
  });

  test('should set isWin properly on win button click', () => {
    const winRadioButton = fixture.debugElement.query(By.css('[value="win"]')).nativeElement;
    expect(component.isWin).toBeFalsy();
    winRadioButton.click();
    expect(component.isWin).toBeTruthy();
  });

  test('should set isWin properly on loss button click', () => {
    const lossRadioButton = fixture.debugElement.query(By.css('[value="loss"]')).nativeElement;
    expect(component.isWin).toBeFalsy();
    lossRadioButton.click();
    expect(component.isWin).toBeFalsy();
  });

  describe('statChanged method', () => {
    test('should work with points', () => {
      component.statChanged({ statType: StatType.points, statCount: 13 });
      expect(component.numPoints).toEqual(13);
      expect(onStatsChangedResult).toEqual(testComponent.playerName);
    });

    test('should work with catches', () => {
      component.statChanged({ statType: StatType.catches, statCount: 33 });
      expect(component.numCatches).toEqual(33);
      expect(onStatsChangedResult).toEqual(testComponent.playerName);
    });

    test('should work with sinkers', () => {
      component.statChanged({ statType: StatType.sinkers, statCount: 18 });
      expect(component.numSinkers).toEqual(18);
      expect(onStatsChangedResult).toEqual(testComponent.playerName);
    });

    test('should work with drops', () => {
      component.statChanged({ statType: StatType.drops, statCount: 5 });
      expect(component.numDrops).toEqual(5);
      expect(onStatsChangedResult).toEqual(testComponent.playerName);
    });

    test('should work with fifas', () => {
      component.statChanged({ statType: StatType.fifas, statCount: 3 });
      expect(component.numFifas).toEqual(3);
      expect(onStatsChangedResult).toEqual(testComponent.playerName);
    });

    test('should work for all', () => {
      component.statChanged({ statType: StatType.points, statCount: 13 });
      component.statChanged({ statType: StatType.catches, statCount: 33 });
      component.statChanged({ statType: StatType.sinkers, statCount: 18 });
      component.statChanged({ statType: StatType.drops, statCount: 5 });
      component.statChanged({ statType: StatType.fifas, statCount: 3 });
      expect(component.numFifas).toEqual(3);
      expect(component.numDrops).toEqual(5);
      expect(component.numSinkers).toEqual(18);
      expect(component.numCatches).toEqual(33);
      expect(component.numPoints).toEqual(13);
      expect(onStatsChangedResult).toEqual(testComponent.playerName);
    });
  });

  describe('getPlayerData method', () => {
    test('should get zeroes on start', () => {
      const stats = component.getPlayerData();
      expect(stats.catches).toEqual(0);
      expect(stats.fifas).toEqual(0);
      expect(stats.points).toEqual(0);
      expect(stats.drops).toEqual(0);
      expect(stats.sinkers).toEqual(0);
      expect(stats.won).toBeFalsy();
      expect(stats.playerName).toEqual(testComponent.playerName);
    });

    test('should update based on new data', () => {
      component.numCatches = 1;
      component.numFifas = 2;
      component.numPoints = 3;
      component.numDrops = 4;
      component.numSinkers = 5;
      component.isWin = true;
      component.playerName = 'newPlayerName';
      const stats = component.getPlayerData();
      expect(stats.catches).toEqual(1);
      expect(stats.fifas).toEqual(2);
      expect(stats.points).toEqual(3);
      expect(stats.drops).toEqual(4);
      expect(stats.sinkers).toEqual(5);
      expect(stats.won).toBeTruthy();
      expect(stats.playerName).toEqual('newPlayerName');
    });
  });

  describe('icons should be displayed appropriately', () => {
    test('should be hidden on start', () => {
      const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
      expect(faIcons.length).toEqual(0);
    });

    test('mvp icon', () => {
      component.mvp = true;
      fixture.detectChanges();
      const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
      expect(faIcons.length).toEqual(1);
      expect(faIcons[0].attributes.title).toEqual('MVP');
    });

    test('lvp icon', () => {
      component.lvp = true;
      fixture.detectChanges();
      const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
      expect(faIcons.length).toEqual(1);
      expect(faIcons[0].attributes.title).toEqual('LVP');
    });

    test('catchLeader icon', () => {
      component.catchLeader = true;
      fixture.detectChanges();
      const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
      expect(faIcons.length).toEqual(1);
      expect(faIcons[0].attributes.title).toEqual('Catch Leader');
    });

    test('pointLeader icon', () => {
      component.pointLeader = true;
      fixture.detectChanges();
      const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
      expect(faIcons.length).toEqual(1);
      expect(faIcons[0].attributes.title).toEqual('Points Leader');
    });

    test('all icons at same time', () => {
      component.lvp = true;
      component.mvp = true;
      component.catchLeader = true;
      component.pointLeader = true;
      fixture.detectChanges();

      const faIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
      expect(faIcons.length).toEqual(4);
      expect(faIcons.some((icon) => icon.attributes.title === 'Points Leader')).toBeTruthy();
      expect(faIcons.some((icon) => icon.attributes.title === 'Catch Leader')).toBeTruthy();
      expect(faIcons.some((icon) => icon.attributes.title === 'MVP')).toBeTruthy();
      expect(faIcons.some((icon) => icon.attributes.title === 'LVP')).toBeTruthy();
    });
  });
});
