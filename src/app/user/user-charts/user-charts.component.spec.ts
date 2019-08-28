import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { User } from '../user.model';
import { UserChartsComponent } from './user-charts.component';

@Component({
  template: '<app-user-charts [users]="users"></app-user-charts>'
})
class TestComponent {
  @ViewChild(UserChartsComponent) public component: UserChartsComponent;
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
  let component: UserChartsComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserChartsComponent,
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

  test('should get users input', () => {
    expect(component.users).toEqual(testComponent.users);
  });

  test('should chart data when users input is changed', () => {
    jest.spyOn(component, 'chartData');
    jest.spyOn(component, 'ngOnChanges');

    testComponent.users = [...testComponent.users];
    fixture.detectChanges();
    expect(component.ngOnChanges).toHaveBeenCalled();
    expect(component.chartData).toHaveBeenCalled();
  });
});
