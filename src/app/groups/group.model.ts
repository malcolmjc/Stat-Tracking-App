import { Game } from '../game/game.model';

export interface Group {
  id: string;
  name: string;
  password: string;
  slogan?: string;
  description?: string;
  admin: string;
  members: string[];
  games: Game[];
}

