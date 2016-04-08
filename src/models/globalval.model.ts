import {API_ROOT} from '../config'

export class GlobalValModel {
  indexImg: string
  styleMode: string
  captchaUrl: string
  constructor(obj?: any) {
    this.indexImg = obj && obj.indexImg || ''
    this.styleMode = obj && obj.styleMode || 'day-mode'
    this.captchaUrl = obj && obj.captchaUrl || API_ROOT + 'users/getCaptcha?'
  }
}