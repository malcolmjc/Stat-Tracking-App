import { GameStats } from './game-stats.model';

export interface PlayerGame extends GameStats {
  id: string;
  playerName: string;
  won: boolean;
}
