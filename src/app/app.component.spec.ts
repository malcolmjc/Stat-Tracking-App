import { async, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { HeaderModule } from './header/header.module';
import { AppRootComponent } from './app-root.component';

describe('AppComponent', () => {
  let authService: SpyObject<AuthService>;

  beforeEach(async(() => {
    authService = createSpyObject(['autoAuthUser']);

    TestBed.configureTestingModule({
      imports: [
        // TODO: Mock this component
        HeaderModule
      ],
      declarations: [
        AppComponent
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
