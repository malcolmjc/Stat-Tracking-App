import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar, faThumbsDown, faHandPaper, faSortAmountUp, faUsers, faChartLine,
  faPlusSquare, faSignOutAlt, faDice, faSignInAlt, faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRootComponent } from './app-root.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { GroupsModule } from './groups/groups.module';
import { HeaderModule } from './header/header.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    AppRootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    AuthModule,
    GameModule,
    GroupsModule,
    HeaderModule,
    UserModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // For now just use all font awesome solid icons
    library.add(faStar, faThumbsDown, faHandPaper, faSortAmountUp, faUsers, faChartLine, faPlusSquare, faSignOutAlt, faDice, faSignInAlt, faUserPlus);
  }
}
