import { PlayerGame } from './player-game.model';

export interface Game {
  id: string;
  date: Date;
  playerGames: [PlayerGame, PlayerGame, PlayerGame, PlayerGame];
}
