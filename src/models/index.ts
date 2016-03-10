import {API_ROOT} from '../config'
export * from './auth.model'
export * from './globalval.model'

export class Options {
  currentPage: number
  itemsPerPage: number
  sortName: string
  tagId: string
  constructor(currentPage?: number,
    itemsPerPage?: number,
    sortName?: string,
    tagId?: string) {
    this.currentPage = currentPage || 1
    this.itemsPerPage = itemsPerPage || 10
    this.sortName = sortName || 'publish_time'
    this.tagId = tagId || ''
  }
}

export class Logins {
  loginBtns: string[]
  constructor(loginBtns?: string[]) {
    this.loginBtns = loginBtns || []
  }
}

export class TagList {
  tags: any[]
  constructor(tags?: any[]) {
    this.tags = tags || []
  }
}



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

export class CommentList {
  isFetching: boolean
  errMsg: string
  items: any[]
  constructor(isFetching?: boolean, errMsg?: string, items?: any[]) {
    this.isFetching = isFetching || false
    this.errMsg = errMsg || ''
    this.items = items || []
  }
}
export class MobileApps {
  apps: any[]
  constructor(apps?: any[]) {
    this.apps = apps || []
  }
}