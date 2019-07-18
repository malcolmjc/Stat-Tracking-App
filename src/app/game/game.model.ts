import { PlayerGame } from './player-game.model';

export interface Game {
  id: string;
  date: string;
  playerGames: [PlayerGame, PlayerGame, PlayerGame, PlayerGame];
  winners: [string, string];
  losers: [string, string];
  score: string;
}