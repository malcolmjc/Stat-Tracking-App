import { GameStats } from '../game/game-stats.model';

export interface UserStats extends GameStats {
  gamesWon: number;
  gamesLost: number;
}
