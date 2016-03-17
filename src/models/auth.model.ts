import { Cookie } from '../utils/cookies'

export class AuthModel {
  token: string
  user: Object
  constructor(token?: string, user?: Object) {
    this.token = token || Cookie.getCookie('token') || ''
    this.user = user || null
  }
}