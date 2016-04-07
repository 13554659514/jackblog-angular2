import {API_ROOT} from '../config'

export class GlobalValModel {
  indexImg: any
  styleMode: string
  captchaUrl: string
  constructor(obj?: any) {
    this.indexImg = obj && obj.indexImg || require('../assets/images/shanghai.jpg')
    this.styleMode = obj && obj.styleMode || 'day-mode'
    this.captchaUrl = obj && obj.captchaUrl || API_ROOT + 'users/getCaptcha?'
  }
}