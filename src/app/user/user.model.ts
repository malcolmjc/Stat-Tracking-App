import { GameStats } from '../game/game-stats.model';

export interface User extends GameStats {
  name: string;
  gamesWon: number;
  gamesLost: number;
}
