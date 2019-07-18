import { Component, Input } from '@angular/core';
import { PlayerGame } from '../player-game.model';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {
  @Input() playerGame: PlayerGame;
}