import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/auth/auth.service';
import { MockImageUploaderComponent } from 'src/app/image-uploader/image-uploader.component.mock';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';
import { UserProfileComponent } from './user-profile.component';
import { UserService } from '../user.service';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let authService: SpyObject<AuthService>;
  let userService: SpyObject<UserService>;
  let toastr: SpyObject<ToastrService>;
  const profileImageLink$ = new Subject<any>();
  const updatedProfile$ = new Subject<string>();

  beforeEach(async(() => {
    authService = createSpyObject(['getUserName']);
    userService = createSpyObject(['getProfileImageLink', 'updateProfileImage']);
    toastr = createSpyObject(['error', 'success']);
    userService.getProfileImageLink.mockReturnValue(profileImageLink$.asObservable());
    userService.updateProfileImage.mockReturnValue(updatedProfile$.asObservable());

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule
      ],
      declarations: [
        UserProfileComponent,
        MockImageUploaderComponent,
        MockLoadingIndicatorComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: UserService, useValue: userService },
        { provide: ToastrService, useValue: toastr }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    test('gets username', () => {
      const username = 'fake-username';
      authService.getUserName.mockReturnValue(username);
      component.ngOnInit();
      expect(component.username).toEqual(username);
    });

    test('updates profile image link', () => {
      const path = 'path-to-image';
      profileImageLink$.next({ path: path});
      expect(component.profileImagePath).toEqual(path);
    });

    test('sets path to assets/question.png if no image link', () => {
      profileImageLink$.next({});
      expect(component.profileImagePath).toEqual('assets/question.png');
    });
  });

  describe('imageSelected functionality', () => {
    beforeEach(() => {
      component.imageSelected(new File([], 'fake'));
    });

    test('starts loading', () => {
      expect(component.imageUploading).toBeTruthy();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('app-loading-indicator'))).toBeTruthy();
    });

    test('on success calls toastr', () => {
      jest.spyOn(toastr, 'success');
      updatedProfile$.next('blah');
      expect(toastr.success).toHaveBeenCalled();
    });

    test('on success stops loading', () => {
      const path = 'fake-path/';
      updatedProfile$.next(path);
      expect(component.imageUploading).toBeFalsy();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('app-loading-indicator'))).toBeFalsy();
    });

    test('on error calls toastr', () => {
      jest.spyOn(toastr, 'error');
      updatedProfile$.error(null);
      expect(toastr.error).toHaveBeenCalled();
    });
  });
});
