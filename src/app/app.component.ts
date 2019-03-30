import { Component, OnInit } from '@angular/core';
import { StockService } from './services/stock.service';
import * as shape from 'd3-shape';

export interface UserModel {
  userId: number,
  tag: string,
  firstName: string,
  lastName: string,
  avatar: string
};

export interface FeedItemModel {
  postId: number,
  userId: number,
  tag: string,
  firstName: string,
  lastName: string,
  avatar: string,
  upvoted: boolean,
  downvoted: boolean,
  content: string,
  commentCount: number,
  bookmarked: boolean,
  followed: boolean,
  shared: boolean
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // authentication
  // accId: string = 'j5brhkl2e9j0l7';
  userId: number = 1;

  // app
  showThemeControls: boolean = true;
  darkTheme: boolean;
  user: UserModel;
  userFeed: FeedItemModel[] = [];

  // temp
  stockSymbol: string;
  stockPrice: number;
  stockChange: number;
  stockGreen: boolean;
  loading: boolean;

  // stock chart
  stockChart: any[];

  // user moves
  userMoves: [];

  constructor(private stockService: StockService) { }

  ngOnInit() {

    /* app setting initialization */
    this.darkTheme = true;

    /* user data loading */
    this.fetchUser();
    this.fetchFeed();

    this.loading = false;
    this.stockSymbol = 'TVIX';
    this.stockPrice = -1;
    this.stockChange = 0;
    this.stockGreen = true;

    this.stockChart = [
      {
        name: 'placeholder SYMBOL',
        series: [
          { value: 1, name: 'first' }
        ]
      }
    ];

    this.fetchQuote(this.stockSymbol);
    this.fetchChart(this.stockSymbol);
  }

  fetchChart(symbol: string) {
    if (!symbol) return;
    this.stockService.getStockChart(symbol).subscribe((chartResponse) => {
      this.stockChart = [
        {
          name: symbol,
          series: [...chartResponse]
        }
      ];
    });
  }

  fetchUser() {

    // initialize user obj to empty vals to
    // prevent weird ngClass bug w/ avatar
    if (!this.user) {
      this.user = {
        userId: -1,
        firstName: '',
        lastName: '',
        tag: '',
        avatar: ''
      };
    }

    // implement a token / authentication system(?)
    this.stockService.getUser(this.userId).subscribe((slice) => {
      this.user = slice;
    });
  }

  fetchFeed() {
    // implement some updating / scrolling mechanism
    this.userFeed = this.stockService.getFeed();
  }

  fetchQuote(query: string) {
    this.loading = true;
    this.stockService.getStockPrice(query).subscribe((slice) => {
      this.loading = false;
      this.stockPrice = slice.latestPrice;
      this.stockChange = slice.changePercent;
      this.stockGreen = slice.changePercent >= 0;
    });
  }

  formatPrice() {
    if (this.loading) {
      return 'LOADING';
    } else {
      if (this.stockPrice == -1) {
        return 'Invalid Symbol';
      } else {
        return `$${this.stockPrice.toFixed(2)}`;
      }
    }
  }

  formatChange() {
    if (this.loading) {
      return '(%waitforit%)'
    } else {
      if (this.stockPrice == -1) {
        return ':(';
      } else {
        let fsc = (this.stockChange * 100).toFixed(2);
        return `(${fsc}%)`;
      }
    }
  }

  toggleTheme() {
    if (!this.darkTheme) {
      document.getElementById('lotus-index').classList.remove('lotus-light-theme');
      document.getElementById('lotus-index').classList.add('lotus-dark-theme');
      this.darkTheme = true;
    } else {
      document.getElementById('lotus-index').classList.remove('lotus-dark-theme');
      document.getElementById('lotus-index').classList.add('lotus-light-theme');
      this.darkTheme = false;
    }
  }

  /* Chart Options */

  areaChartOptions = {
    view: null,
    results: [], //
    scheme: { domain: ['#64FFDA'] },
    schemeType: 'ordinal',
    customColors: null,
    animations: true,
    legend: false,
    legendTitle: 'Legend',
    legendPosition: 'right',
    xAxis: false,
    yAxis: false,
    showGridLines: false,
    roundDomains: false,
    showXAxisLabel: false,
    showYAxisLabel: false,
    xAxisLabel: 'Country',
    yAxisLabel: 'Population',
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    maxXAxisTickLength: 16,
    maxYAxisTickLength: 16,
    xAxisTickFormatting: null,
    yAxisTickFormatting: null,
    xAxisTicks: null,
    yAxisTicks: null,
    timeline: false,
    autoScale: false,
    curve: shape.curveBasis,
    gradient: false,
    activeEntries: [],
    tooltipDisabled: false,
    tooltipTemplate: null, //
    seriesTooltipTemplate: null, //
    xScaleMin: null,
    xScaleMax: null,
    yScaleMin: null,
    yScaleMax: null
  };

  lineChartOptions = {
    view: null,
    results: [], //
    scheme: { domain: ['#64FFDA'] },
    schemeType: 'ordinal',
    customColors: null,
    animations: true,
    rangeFillOpacity: 0.15,
    legend: false,
    legendTitle: 'Legend',
    legendPosition: 'right',
    xAxis: false,
    yAxis: false,
    showGridLines: true,
    roundDomains: false,
    showXAxisLabel: false,
    showYAxisLabel: false,
    xAxisLabel: 'Country',
    yAxisLabel: 'Population',
    trimXAxisTicks: true,
    trimYAxisTicks: true,
    maxXAxisTickLength: 16,
    maxYAxisTickLength: 16,
    xAxisTickFormatting: null,
    yAxisTickFormatting: null,
    xAxisTicks: null,
    yAxisTicks: null,
    timeline: false,
    autoScale: true,
    curve: shape.curveNatural, // or: curveLinear
    gradient: false,
    activeEntries: [],
    tooltipDisabled: false,
    tooltipTemplate: null, //
    seriesTooltipTemplate: null, //
    referenceLines: null,
    showRefLines: false,
    showRefLabels: true,
    xScaleMin: null,
    xScaleMax: null,
    yScaleMin: null,
    yScaleMax: null
  };

  /*
  ngxChartExample = [
    {
      name: "Series Name Goes Here",
      series: [
        {
          value: 30,
          name: 'first'
        },
        {
          value: 60,
          name: 'second'
        },
        {
          value: 90,
          name: 'third'
        } // more data points go here...
      ]
    } // multiple series also supported
  ];
  */

}
