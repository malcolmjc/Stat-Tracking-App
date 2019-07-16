import { GameStats } from '../game/game-stats.model';

export interface TeamStats extends GameStats {
  wins: number;
  losses: number;
}
