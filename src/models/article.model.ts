export class ArticleList {
  isFetching: boolean
  isMore: boolean
  items: any[]
  constructor(isFetching?: boolean, isMore?: boolean, items?: any[]) {
    this.isFetching = isFetching || false
    this.isMore = isMore || true
    this.items = items || []
  }
}

export class ArticleDetail {
  articleDetail: Object
  constructor(articleDetail?: Object) {
    this.articleDetail = articleDetail || {}
  }
}

export class PrenextArticle {
  next: Object
  prev: Object
  constructor(next?: Object, prev?: Object) {
    this.prev = prev || {}
    this.next = next || {}
  }
}
