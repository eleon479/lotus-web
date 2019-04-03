import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private LOTUS_SERVICE_HOST = 'https://lotus-service.herokuapp.com';
  constructor(private http: HttpClient) {}

  upvotePost(upvoteAction) {

    const call = `${this.LOTUS_SERVICE_HOST}/api/votes/`;
    const upvoteRequestObject = {
      userId: upvoteAction.userId,
      postId: upvoteAction.postId,
      voteType: upvoteAction.voteType // upvote | downvote
    };

    console.log('stock service upvotePost called -> sending request to express with call = ');
    console.log(call);
    console.log('and upvoteRequestObject = ');
    console.log(upvoteRequestObject);

    this.http.post(call, upvoteRequestObject)
    .subscribe(
      (val) => {
          console.log('POST req success: ', val);
      },
      response => {
          console.log('POST req failed: ', response);
      },
      () => {
          console.log('Observable complete.');
      });
  }

  getStockChart(symbol: string) {
    interface ChartSeries {
      value: number;
      name: string;
    }

    const stock = symbol;
    const call = `${this.LOTUS_SERVICE_HOST}/api/ext/charts/${stock}`;

    return this.http.get<ChartSeries[]>(call);
  }

  getStockPrice(symbol: string) {
    interface StockPrice {
      latestPrice: number;
      changePercent: number;
    }

    const stock = symbol;
    const call = `${this.LOTUS_SERVICE_HOST}/api/ext/quotes/${stock}`;

    return this.http.get<StockPrice>(call);
  }

  getMoves(userId: number) {
    interface UserMove {
      moveId: number;
      userId: number;
      userTag: string;
      title: string;
      symbol: string;
      description: string;
      // tags: string[];
      entry: number;
      target: number;
    }

    const call = `${this.LOTUS_SERVICE_HOST}/api/moves/${userId}`;
    return this.http.get<UserMove[]>(call);
  }

  getUser(userId: number) {
    interface UserCore {
      id: number;
      firstname: string;
      lastname: string;
      tag: string;
      avatar: string;
    }

    const call = `${this.LOTUS_SERVICE_HOST}/api/users/${userId}`;

    return this.http.get<UserCore>(call);
  }

  getFeed() {
    interface Post {
      // relation data
      id: number;
      userId: number;

      // post data
      title: string;
      contents: string;
      firstname: string;
      lastname: string;
      tag: string;
      avatar: string;

      // seconday data about the post
      commentCount: number;

      // data about the post specific to this user
      upvoted: boolean;
      downvoted: boolean;
      bookmarked: boolean;
      followed: boolean;
      shared: boolean;
    }

    const call = `${this.LOTUS_SERVICE_HOST}/api/posts/`;

    return this.http.get<Post[]>(call);
  }
}
