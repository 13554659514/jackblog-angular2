export * from './auth.model'
export * from './globalval.model'
export * from './tag.model'
export * from './article.model'
export * from './comment.model'

export class Logins {
  loginBtns: string[]
  constructor(loginBtns?: string[]) {
    this.loginBtns = loginBtns || []
  }
}

export class MobileAppsModel {
  apps: any[]
  constructor(apps?: any[]) {
    this.apps = apps || []
  }
}

export class ToasterModel {
	title: string
	content: string
	type: string
	constructor(obj?: any) {
		this.title = obj && obj.title || ''
		this.content = obj && obj.content || ''
		this.type = obj && obj.type || ''
	}
}