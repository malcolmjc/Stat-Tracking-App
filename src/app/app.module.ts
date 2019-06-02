import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule,
  MatExpansionModule, MatRadioModule, MatTableModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
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
import { GamePlayerSelectComponent } from './game/game-player-select/game-player-select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlayerSelectionFormFieldComponent } from './user/player-selection-form-field/player-selection-form-field.component';
import { MatchupPredictorComponent } from './user/matchup-predictor/matchup-predictor.component';
import { PredictorStatsComponent } from './user/predictor-stats/predictor-stats.component';

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
    DialogContentCancel,
    GamePlayerSelectComponent,
    PlayerSelectionFormFieldComponent,
    MatchupPredictorComponent,
    PredictorStatsComponent
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule
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
