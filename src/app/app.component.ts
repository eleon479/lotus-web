import { Component, OnInit } from '@angular/core';
import { StockService } from './services/stock.service';
import * as shape from 'd3-shape';

export interface UserModel {
  userId: number;
  tag: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface FeedItemModel {
  postId: number;
  userId: number;

  title: string;
  contents: string;
  firstName: string;
  lastName: string;
  tag: string;
  avatar: string;

  commentCount: number;

  upvoted: boolean;
  downvoted: boolean;
  bookmarked: boolean;
  followed: boolean;
  shared: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // authentication
  userId = 1;

  // app
  sideExpanded: boolean;
  showThemeControls = true;
  darkTheme: boolean;

  // user data
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

  // search state
  searchFocused: boolean;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    /* app setting initialization - @TODO->import from account settings db */
    this.darkTheme = true;
    this.sideExpanded = false;

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
        series: [{ value: 1, name: 'first' }]
      }
    ];

    function themeSample() {
      console.log('hello world!');
    }

    this.fetchQuote(this.stockSymbol);
    this.fetchChart(this.stockSymbol);

    this.searchFocused = false;
  }

  focusSearch() {
    this.searchFocused = true;
  }

  blurSearch() {
    this.searchFocused = false;
  }

  fetchChart(symbol: string) {
    if (symbol) {
      this.stockService.getStockChart(symbol).subscribe(chartResponse => {
        this.stockChart = [
          {
            name: symbol,
            series: [...chartResponse]
          }
        ];
      });
    }
  }

  fetchUser() {
    // initialize user obj to empty vals to
    // prevent weird ngClass bug w/ avatar
    if (!this.user) {
      this.user = {
        userId: -1,
        firstName: 'loading',
        lastName: 'loading',
        tag: 'loading',
        avatar: 'avatar1'
      };
    }

    // implement a token / authentication system(?)
    this.stockService.getUser(this.userId).subscribe(slice => {
      this.user = {
        userId: slice.id,
        firstName: this.formatName(slice.firstname),
        lastName: this.formatName(slice.lastname),
        tag: slice.tag,
        avatar: slice.avatar
      };
    });
  }

  fetchFeed() {
    // implement some updating / scrolling mechanism

    this.stockService.getFeed().subscribe(posts => {
      this.userFeed = posts.map(post => {
        const randomBoolean = (): boolean => {
          return Boolean(Math.floor(Math.random() * 2));
        };

        const tempCommentCount = Math.floor(Math.random() * 10);
        const tempVoted = randomBoolean();
        const tempUpvoted = tempVoted ? randomBoolean() : false;
        const tempDownvoted = tempVoted ? !tempUpvoted : false;
        const tempBookmared = randomBoolean();
        const tempFollowed = randomBoolean();
        const tempShared = randomBoolean();

        return {
          postId: post.id,
          userId: post.userId,
          title: post.title,
          contents: post.contents,
          firstName: post.firstname,
          lastName: post.lastname,
          tag: post.tag,
          avatar: post.avatar,
          commentCount: tempCommentCount,
          upvoted: tempUpvoted,
          downvoted: tempDownvoted,
          bookmarked: tempBookmared,
          followed: tempFollowed,
          shared: tempShared
        };
      });
    });
  }

  fetchQuote(query: string) {
    this.loading = true;
    this.stockService.getStockPrice(query).subscribe(slice => {
      this.loading = false;
      this.stockPrice = slice.latestPrice;
      this.stockChange = slice.changePercent;
      this.stockGreen = slice.changePercent >= 0;
    });
  }

  upvotePost(item: any) {
    console.log('upvotePost triggered for post item: ');
    console.log(item);

    // update ui component immediately
    item.upvoted = !item.upvoted;
    item.downvoted = false;

    // fire off service request to express backend with:
    interface UpvoteAction {
      userId: number;
      postId: number;
      voteType: string; // upvote | downvote
    }

    const upvoteActionObject = {
      userId: this.userId,
      postId: item.postId,
      voteType: 'upvote'
    };

    console.log('upvote action object being sent: ');
    console.log(upvoteActionObject);

    this.stockService.upvotePost(upvoteActionObject);
  }

  downvotePost(item: any) {
    item.downvoted = !item.downvoted;
    item.upvoted = false;
  }

  bookmarkPost(item: any) {
    item.bookmarked = !item.bookmarked;
  }

  followPost(item: any) {
    item.followed = !item.followed;
  }

  sharePost(item: any) {
    item.shared = !item.shared;
  }

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
  }

  formatPrice() {
    if (this.loading) {
      return 'LOADING';
    } else {
      if (this.stockPrice === -1) {
        return 'Invalid Symbol';
      } else {
        return `$${this.stockPrice.toFixed(2)}`;
      }
    }
  }

  formatChange() {
    if (this.loading) {
      return '(%waitforit%)';
    } else {
      if (this.stockPrice === -1) {
        return ':(';
      } else {
        const fsc = (this.stockChange * 100).toFixed(2);
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

  toggleSidenav() {
    this.sideExpanded = !this.sideExpanded;
  }

  /* Chart Options */

  // tslint:disable-next-line: member-ordering
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

  // tslint:disable-next-line: member-ordering
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
