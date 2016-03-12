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