import { Cookie } from '../utils/cookies'

export class AuthModel {
  token: string
  user: Object
  errMsg: string
  constructor(token?: string, user?: Object, errMsg?: string) {
    this.token = token || Cookie.getCookie('token') || ''
    this.user = user || null
    this.errMsg = errMsg || ''
  }
}