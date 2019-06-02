import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamStats } from '../team.stats.model';
import { UserService } from '../user.service';
import { GameService } from 'src/app/game/game.service';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/game/game.model';

@Component({
  selector: 'app-predictor-stats',
  templateUrl: './predictor-stats.component.html',
  styleUrls: ['./predictor-stats.component.css']
})
export class PredictorStatsComponent implements OnInit {

  teamOne: string[] = ['', ''];
  teamTwo: string[] = ['', ''];
  firstTeamStats: TeamStats;
  secondTeamStats: TeamStats;
  gameListener: Subscription;
  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames();
    this.gameListener = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        this.userService.setGames(games);
        this.route.queryParams
          .subscribe(params => {
              if (params.teamOne === undefined || params.teamTwo === undefined) {
                this.router.navigate(['predict-matchup']);
              }
              this.teamOne = params.teamOne;
              this.teamTwo = params.teamTwo;
              try {
               this.userService.checkMatchup(this.teamOne, this.teamTwo);
              } catch (e) {
                this.router.navigate(['predict-matchup']);
              }

              const teamStats = this.userService.getResults(this.teamOne, this.teamTwo);
              this.firstTeamStats = teamStats[0];
              this.secondTeamStats = teamStats[1];
          });
    });
  }
}
