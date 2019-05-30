import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatRadioModule, MatTableModule } from '@angular/material';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { HttpClientModule } from '@angular/common/http';
import { UserStatsComponent } from './user/user-stats/user-stats.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GameCreateListComponent, DialogContentDone, DialogContentFailure, DialogContentCancel } from './game/game-create-list/game-create-list.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameListComponent,
    GameCreateComponent,
    UserStatsComponent,
    GameCreateListComponent,
    DialogContentDone,
    DialogContentFailure,
    DialogContentCancel
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    DialogContentDone,
    DialogContentFailure,
    DialogContentCancel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
