import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AppRootComponent } from './app-root.component';
import { AuthService } from './auth/auth.service';
import { MockHeaderComponent } from './header/header.component.mock';

describe('AppComponent', () => {
  let authService: SpyObject<AuthService>;

  beforeEach(async(() => {
    authService = createSpyObject(['autoAuthUser']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockHeaderComponent,
        AppRootComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
