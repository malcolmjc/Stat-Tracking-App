import { UserStats } from './user-stats.model';

export interface User {
  stats: UserStats;
  username: string;
  name?: string;
}
