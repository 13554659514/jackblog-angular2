import { Cookie } from 'angular2-cookies'

export class AuthModel {
  token: string
  user: Object
  constructor(token?: string, user?: Object) {
    this.token = token || Cookie.load('token') || ''
    this.user = user || null
  }
}