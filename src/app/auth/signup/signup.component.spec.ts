import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { Subject } from 'rxjs';

import { AuthService } from '../auth.service';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: SpyObject<AuthService>;
  const authStatusListener = new Subject<boolean>();

  beforeEach(async(() => {
    authService = createSpyObject(['createUser', 'getAuthStatusListener']);
    authService.getAuthStatusListener.mockReturnValue(authStatusListener);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule
      ],
      declarations: [
        SignupComponent,
        MockLoadingIndicatorComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have loading indicator at appropriate times', () => {
    let loadingIndicator = fixture.debugElement.query(By.css('app-loading-indicator'));
    expect(loadingIndicator).toBeFalsy();

    component.isLoading = true;
    fixture.detectChanges();
    loadingIndicator = fixture.debugElement.query(By.css('app-loading-indicator'));
    expect(loadingIndicator).toBeTruthy();

    authStatusListener.next(false);
    fixture.detectChanges();
    loadingIndicator = fixture.debugElement.query(By.css('app-loading-indicator'));
    expect(loadingIndicator).toBeFalsy();

    component.isLoading = true;
    fixture.detectChanges();
    loadingIndicator = fixture.debugElement.query(By.css('app-loading-indicator'));
    expect(loadingIndicator).toBeTruthy();

    authStatusListener.next(true);
    fixture.detectChanges();
    loadingIndicator = fixture.debugElement.query(By.css('app-loading-indicator'));
    expect(loadingIndicator).toBeFalsy();
  });

  it('should deny invalid empty form', () => {
    jest.spyOn(authService, 'createUser');
    jest.spyOn(component, 'onSignup');

    expect(authService.createUser).toHaveBeenCalledTimes(0);
    expect(component.onSignup).toHaveBeenCalledTimes(0);
    expect(component.isLoading).toBeFalsy();
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.onSignup).toHaveBeenCalledTimes(1);
    expect(component.form.invalid).toBeTruthy();
  });

  it('should accept valid form', () => {
    jest.spyOn(authService, 'createUser');
    jest.spyOn(component, 'onSignup');

    expect(authService.createUser).toHaveBeenCalledTimes(0);
    expect(component.onSignup).toHaveBeenCalledTimes(0);
    expect(component.isLoading).toBeFalsy();

    const form = component.form;
    expect(form.invalid).toBeTruthy();
    const emailControl: FormControl = form.controls.email;
    emailControl.setValue('fake@gmail.com');

    const passwordControl: FormControl = form.controls.password;
    passwordControl.setValue('password');

    const usernameControl: FormControl = form.controls.username;
    usernameControl.setValue('username');

    fixture.detectChanges();
    expect(form.invalid).toBeFalsy();
  });

  it('should limit password inputs', () => {
    const form = component.form;
    expect(form.invalid).toBeTruthy();
    const passwordControl: FormControl = form.controls.password;
    expect(passwordControl.invalid).toBeTruthy();
    passwordControl.setValue('1');
    expect(passwordControl.invalid).toBeTruthy();
    passwordControl.setValue('12');
    expect(passwordControl.invalid).toBeTruthy();
    passwordControl.setValue('123');
    expect(passwordControl.invalid).toBeTruthy();
    passwordControl.setValue('1234');
    expect(passwordControl.invalid).toBeTruthy();
    passwordControl.setValue('12345');
    expect(passwordControl.invalid).toBeFalsy();
  });

  it('should limit email inputs', () => {
    const form = component.form;
    expect(form.invalid).toBeTruthy();
    const emailControl: FormControl = form.controls.email;
    expect(emailControl.invalid).toBeTruthy();
    emailControl.setValue('fake@');
    expect(emailControl.invalid).toBeTruthy();
    emailControl.setValue('@');
    expect(emailControl.invalid).toBeTruthy();
    emailControl.setValue('@fake');
    expect(emailControl.invalid).toBeTruthy();
    emailControl.setValue('a@b.com');
    expect(emailControl.invalid).toBeFalsy();
  });

  it('should limit username inputs to alphanumeric', () => {
    const form = component.form;
    expect(form.invalid).toBeTruthy();
    const usernameControl: FormControl = form.controls.username;
    expect(usernameControl.invalid).toBeTruthy();
    usernameControl.setValue('sma');
    expect(usernameControl.invalid).toBeTruthy();
    usernameControl.setValue('invalidChar@');
    expect(usernameControl.invalid).toBeTruthy();
    usernameControl.setValue('onlyAlphas');
    expect(usernameControl.invalid).toBeFalsy();
    usernameControl.setValue('12345');
    expect(usernameControl.invalid).toBeFalsy();
    usernameControl.setValue('alphasAndNumber123');
    expect(usernameControl.invalid).toBeFalsy();
    usernameControl.setValue('alphas And Number 123');
    expect(usernameControl.invalid).toBeFalsy();
  });
});
