import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { MatGridListModule } from '@angular/material';

import { ConvertNaNPipe } from 'src/app/pipes/convert-nan.pipe';
import { User } from '../user.model';
import { UserStatsComponent } from './user-stats.component';

@Component({
  template: '<app-user-stats [users]="users"></app-user-stats>'
})
class TestComponent {
  @ViewChild(UserStatsComponent) public component: UserStatsComponent;
  public users: User[] = [{
    stats: {
      catches: 0,
      drops: 1,
      fifas: 2,
      sinkers: 3,
      gamesLost: 4,
      gamesWon: 5,
      points: 6
    },
    username: 'fake-user'
  }];
}
describe('UserChartsComponent', () => {
  let component: UserStatsComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatGridListModule
      ],
      declarations: [
        UserStatsComponent,
        TestComponent,
        ConvertNaNPipe
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

  test('should get users input', () => {
    expect(component.users).toEqual(testComponent.users);
  });
});
