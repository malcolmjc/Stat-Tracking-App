import { Game } from './game.model';
import { PlayerGame } from './player-game.model';

export interface GameDisplay extends Game {
  winningScore: number;
  losingScore: number;
  winners: string[];
  losers: string[];
  winnerGames: PlayerGame[];
  loserGames: PlayerGame[];
}
