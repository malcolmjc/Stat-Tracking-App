import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';

import { UserDisplayComponent } from './user-display.component';
import { UserService } from '../user.service';

@Component({
  template: `<app-user-display
               [username]="username"
               [size]="size">
             </app-user-display>`
})
class TestComponent {
  @ViewChild(UserDisplayComponent) public component: UserDisplayComponent;
  public username = null;
  public size: 'medium' | 'large' = 'medium';
}

describe('UserDisplayComponent', () => {
  let component: UserDisplayComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let userService: SpyObject<UserService>;
  const profileImage$ = new Subject<any>();

  beforeEach(async(() => {
    userService = createSpyObject(['getProfileImageLink']);
    userService.getProfileImageLink.mockReturnValue(profileImage$.asObservable());

    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [
        UserDisplayComponent,
        TestComponent
      ],
      providers: [
        { provide: UserService, useValue: userService }
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

  describe('display sizes', () => {
    beforeEach(() => {
      component.profilePath = 'fake/';
    });

    test('medium size', () => {
      component.size = 'medium';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h3'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('h1'))).toBeFalsy();

      const image = fixture.debugElement.query(By.css('img')).nativeElement;
      expect(image.classList.contains('medium-img')).toBeTruthy();
    });

    test('large size', () => {
      component.size = 'large';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('h1'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('h3'))).toBeFalsy();

      const image = fixture.debugElement.query(By.css('img')).nativeElement;
      expect(image.classList.contains('large-img')).toBeTruthy();
    });
  });

  describe('ngOnInit behavior', () => {
    test('doesnt call getProfileImageLink if no username', () => {
      jest.spyOn(userService, 'getProfileImageLink');
      expect(userService.getProfileImageLink).not.toHaveBeenCalled();
    });

    test('updates profile path', () => {
      jest.spyOn(userService, 'getProfileImageLink');
      component.username = 'username';
      component.ngOnInit();
      expect(userService.getProfileImageLink).toHaveBeenCalled();
      const path = 'fake-path/';
      profileImage$.next({ path: path });
      expect(component.profilePath).toEqual(path);
    });
  });
});
