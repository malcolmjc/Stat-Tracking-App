import { Component, Input } from '@angular/core';

import { TeamStats } from '../team.stats.model';

@Component({
  selector: 'app-predictor-stats-results',
  templateUrl: './predictor-stats-results.component.html',
  styleUrls: ['./predictor-stats-results.component.css']
})
export class PredictorStatsResultsComponent {
  @Input() teamStats: TeamStats;
}
