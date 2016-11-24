import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { AuthModel, ToasterModel } from '../models'
import {Subject, BehaviorSubject, ReplaySubject, Observable} from 'rxjs'
import { API_ROOT, CookieDomain } from '../config'
import { Cookie } from 'angular2-cookies'
import { ResourceService } from '../utils/resources'
import { Router } from '@angular/router'
import { ShowtoasterService } from '../utils/showtoaster'
import { GlobalValService } from './globalval.service'

@Injectable()
export class AuthService {
		authInitialState: AuthModel = new AuthModel()
		tokenSubject: Subject<any> = new BehaviorSubject<Object>(this.authInitialState.token)
		userSubject: Subject<Object> = new ReplaySubject<Object>(1)
		snsLoginsSubject: Subject<string[]> = new ReplaySubject<string[]>(1)
		constructor(
			public http: Http,
			public rs: ResourceService,
			private _router: Router,
			private showtoasterService: ShowtoasterService,
			private globalValService: GlobalValService
		) {
			//token, 如果cookie存在, 则
			if (this.authInitialState.token !== ''){
				this.getUserInfo()
			}else{
				this.userSubject.next(this.authInitialState.user)
			}
			this.getSnsLogins()
		}
		saveCookie(name:string,value:string):void {
			Cookie.save(name, value, null, null, CookieDomain)
		}
		getCookie(name:string) {
			return Cookie.load(name)
		}
		deleteCookie(name:string):void {
			Cookie.remove(name)
		}
		//登录请求.
		localLogin(data: Object):void {
			this.rs.localLogin(data)
					.subscribe((res: Response) => {
						//成功
						let token = res.json().token
						this.saveCookie('token',token)
						this.tokenSubject.next(token)
						this.getUserInfo()
						let toasterInfo = new ToasterModel({
							content: '有朋自远方来, 不亦乐乎!',
							type: 'success'
						})
						this.showtoasterService.showToaster(toasterInfo)
						this._router.navigate(['Home'])
					},(err:any)=>{
						let toasterInfo = new ToasterModel({
							content: err.json().error_msg || '登录失败',
							type: 'error'
						})
						this.showtoasterService.showToaster(toasterInfo)
						this.globalValService.getCaptchaUrl()
					})

		}
		getUserInfo():void{
			this.rs.getMe().subscribe((res:Response)=>{
				this.userSubject.next(res.json())
			})
		}
		logout():void{
			this.deleteCookie('token')
			this.tokenSubject.next('')
			this.userSubject.next(this.authInitialState.user)
			this._router.navigate(['Home'])
		}

		updateUser(data:Object):void{
			this.rs.mdUser(data).subscribe((res:Response)=>{
				this.userSubject.next(res.json().data)
				let toasterInfo = new ToasterModel({
					content:'更新用户成功.',
					type: 'success'
				})
				this.showtoasterService.showToaster(toasterInfo)
			},(err:any)=>{
				let toasterInfo = new ToasterModel({
					content: err.json().error_msg || '更新用户资料失败',
					type: 'error'
				})
				this.showtoasterService.showToaster(toasterInfo)
			})
		}
		getSnsLogins(){
			this.rs.getSnsLogins()
				.subscribe((res:Response)=>{
					this.snsLoginsSubject.next(res.json().data)
				},(err)=>{
					this.snsLoginsSubject.next([])
				})
		}

}

// export var AuthServiceInjectables: Array<any> = [
// 		bind(AuthService).toClass(AuthService)
// ]