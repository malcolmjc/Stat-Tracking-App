import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material';

import { Group } from '../group.model';
import { GroupDisplayComponent } from './group-display.component';

@Component({
  template: `<app-group-display [group]="group"></app-group-display>`
})
class TestComponent {
  @ViewChild(GroupDisplayComponent) public component: GroupDisplayComponent;

  public group: Group = {
    id: 'fake-id',
    name: 'fake-name',
    password: 'fake-password',
    slogan: 'fake-slogan',
    description: 'fake-description',
    admin: 'fake-admin',
    members: ['member1', 'member2', 'member3'],
    games: []
  };
}
describe('GroupDisplayComponent', () => {
  let component: GroupDisplayComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule
      ],
      declarations: [
        GroupDisplayComponent,
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

  test('should correctly receive group input', () => {
    expect(component.group).toEqual(testComponent.group);
  });

  describe('displays group correctly', () => {
    test('should display group name correctly', () => {
      const groupName = fixture.debugElement.query(By.css('.group-name')).nativeElement;
      expect(groupName.textContent).toEqual(testComponent.group.name);
    });

    test('should display group members correctly', () => {
      const memberNames = fixture.debugElement.queryAll(By.css('.member-name'));
      expect(memberNames.length).toEqual(testComponent.group.members.length);
      memberNames.forEach((memberNameDebugElem, index) => {
        expect(memberNameDebugElem.nativeElement.textContent).toEqual(testComponent.group.members[index]);
      });
    });

    test('should display group slogan correctly', () => {
      const groupSlogan = fixture.debugElement.query(By.css('.group-slogan')).nativeElement;
      expect(groupSlogan.textContent).toEqual(testComponent.group.slogan);
    });

    test('should display group description correctly', () => {
      const groupDescription = fixture.debugElement.query(By.css('.group-description')).nativeElement;
      expect(groupDescription.textContent).toEqual(testComponent.group.description);
    });
  });
});
