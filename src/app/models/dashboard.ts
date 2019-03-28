
export interface Stock {
  symbol: string,
  label: string,
  lastPrice: number
}

export interface StockCollection {
  stockList: [{
    stock: Stock,
    quantity: number,
    entry: number
  }]
}

export interface UserModel {
  userId: number,
  tag: string,
  firstName: string,
  lastName: string,
  avatar: string,
  collection: StockCollection
}

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
}