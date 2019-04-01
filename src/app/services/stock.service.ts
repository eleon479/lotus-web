import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private LOTUS_SERVICE_HOST = 'https://lotus-service.herokuapp.com';
  constructor(private http: HttpClient) { }

  getStockChart(symbol: string) {

    interface ChartSeries {
      value: number,
      name: string
    };

    const stock = symbol;
    const call = `${this.LOTUS_SERVICE_HOST}/api/ext/charts/${stock}`;

    return this.http.get<ChartSeries[]>(call);
  }

  getStockPrice(symbol: string) {

    interface XQuote {
      latestPrice: number,
      changePercent: number
    };

    const stock = symbol;
    const call = `${this.LOTUS_SERVICE_HOST}/api/ext/quotes/${stock}`;

    return this.http.get<XQuote>(call);
  }

  getMoves(userId: number) {

    interface UserMove {
      moveId: number;
      userId: number;
      userTag: string;
      title: string;
      symbol: string;
      description: string;
      //tags: string[];
      entry: number;
      target: number;
    };

    const call = `${this.LOTUS_SERVICE_HOST}/api/moves/${userId}`;

    return this.http.get<UserMove[]>(call);
  }

  getUser(userId: number) {

    interface UserCore {
      id: number,
      firstname: string,
      lastname: string,
      tag: string,
      avatar: string
    };

    const call = `${this.LOTUS_SERVICE_HOST}/api/users/${userId}`;

    return this.http.get<UserCore>(call);
  }

  getFeed() {
    return [{
      postId: 1,
      userId: 1,
      tag: 'eleon479',
      firstName: 'Eddy',
      lastName: 'Leon',
      avatar: 'avatar1',
      upvoted: true,
      downvoted: false,
      content: 'a randomly generated post + inserted into an ng-templat',
      commentCount: 3,
      bookmarked: false,
      followed: true,
      shared: false
    },
    {
      postId: 2,
      userId: 2,
      tag: 'aunvt',
      firstName: 'Another',
      lastName: 'User',
      avatar: 'avatar2',
      upvoted: false,
      downvoted: true,
      content: 'sample text (also random)',
      commentCount: 2,
      bookmarked: false,
      followed: false,
      shared: false
    },
    {
      postId: 3,
      userId: 1,
      tag: 'eleon479',
      firstName: 'Eddy',
      lastName: 'Leon',
      avatar: 'avatar3',
      upvoted: false,
      downvoted: false,
      content: 'more dynamically inserted content!',
      commentCount: 0,
      bookmarked: true,
      followed: false,
      shared: true
    },
    {
      postId: 4,
      userId: 305,
      tag: 'dale',
      firstName: 'Pit',
      lastName: 'Bull',
      avatar: 'avatar4',
      upvoted: false,
      downvoted: true,
      content: 'sample text (also random)',
      commentCount: 2,
      bookmarked: false,
      followed: false,
      shared: false
    },
    {
      postId: 4,
      userId: 305,
      tag: 'dale',
      firstName: 'Pit',
      lastName: 'Bull',
      avatar: 'avatar5',
      upvoted: false,
      downvoted: true,
      content: 'sample text (also random)',
      commentCount: 2,
      bookmarked: false,
      followed: false,
      shared: false
    },
    {
      postId: 4,
      userId: 305,
      tag: 'dale',
      firstName: 'Pit',
      lastName: 'Bull',
      avatar: 'avatar6',
      upvoted: false,
      downvoted: true,
      content: 'sample text (also random)',
      commentCount: 2,
      bookmarked: false,
      followed: false,
      shared: false
    },
    {
      postId: 4,
      userId: 305,
      tag: 'dale',
      firstName: 'Pit',
      lastName: 'Bull',
      avatar: 'avatar7',
      upvoted: false,
      downvoted: true,
      content: 'sample text (also random)',
      commentCount: 2,
      bookmarked: false,
      followed: false,
      shared: false
    }];
  }
}
