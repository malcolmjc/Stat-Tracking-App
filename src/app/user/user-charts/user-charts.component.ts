import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';

import { User } from '../user.model';

declare var require: any;
const Boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-user-charts',
  templateUrl: './user-charts.component.html',
  styleUrls: ['./user-charts.component.css']
})
export class UserChartsComponent implements OnChanges {
  @ViewChild('chart') public chart;
  @Input() public users: User[] = [];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.users) {
      this.chartData();
    }
  }

  public chartData() {
    if (!this.users || this.users.length === 0) {
      return;
    }
    const options: any = {
      chart: {
        type: 'column',
        height: 500
      },
      title: {
        text: 'User Stats'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return this.series.name;
        }
      },
      xAxis: {
        categories: this.users.map((user) => user.username)
      },
      yAxis: {
        min: 0
      },
      series: [{
          name: 'Catches',
          data: this.users.map((user) => user.stats.catches)
        }, {
          name: 'Points',
          data: this.users.map((user) => user.stats.points)
        }, {
          name: 'Drops',
          data: this.users.map((user) => user.stats.drops)
        }, {
          name: 'Games Lost',
          data: this.users.map((user) => user.stats.gamesLost)
        }, {
          name: 'Games Won',
          data: this.users.map((user) => user.stats.gamesWon)
        }, {
          name: 'Fifas',
          data: this.users.map((user) => user.stats.fifas)
        }, {
          name: 'Drops',
          data: this.users.map((user) => user.stats.drops)
        }]
    };

    Highcharts.chart(this.chart.nativeElement, options);
  }
}
