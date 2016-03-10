import { Injectable, bind } from 'angular2/core'
import { Http, Response, Headers, RequestOptions } from 'angular2/http'
import { AuthModel } from '../models'
import {Subject, BehaviorSubject, ReplaySubject, Observable} from 'rxjs'
import { API_ROOT, CookieDomain } from '../config'
import { Cookie } from '../utils/cookies'
import { ResourceService } from '../utils/resources'

@Injectable()
export class AuthService {
		authInitialState: AuthModel = new AuthModel()
		errMsgSubject: Subject<string> = new ReplaySubject<string>(1)
		tokenSubject: Subject<string> = new Subject<string>()
		userSubject: Subject<Object> = new BehaviorSubject<Object>(this.authInitialState.user)

		constructor(public http: Http, public rs: ResourceService) {
			console.log(this.authInitialState)
			console.log(Cookie.getCookie('token'))
			//token, 如果cookie存在, 则
			if (this.authInitialState.token !== ''){
				this.tokenSubject.next(this.authInitialState.token)
				this.getUserInfo()
			}
		}
		saveCookie(name:string,value:string):void {
			Cookie.setCookie(name, value, null, null, CookieDomain)
		}
		getCookie(name:string) {
			return Cookie.getCookie(name)
		}
		deleteCookie(name:string):void {
			Cookie.deleteCookie(name)
		}
		//登录请求.
		localLogin(data: Object):void {
			this.rs.localLogin(data)
					.subscribe((res: Response) => {
						console.log('响应成功')
						console.log(res)
						//成功
						let token = res.json().token
						this.saveCookie('token',token)
						this.errMsgSubject.next('')
						this.tokenSubject.next(token)
						this.getUserInfo()
					},(err:any)=>{
						console.log(err)
						this.errMsgSubject.next(err.json().error_msg || '登录失败')
					})

		}
		getUserInfo():void{
			this.rs.getMe().subscribe((res:Response)=>{
				console.log(res.json())
				this.userSubject.next(res.json())
			})
		}
		logout():void{
			this.deleteCookie('token')
			this.tokenSubject.next('')
			this.userSubject.next({})
			//跳转
		}

}

export var AuthServiceInjectables: Array<any> = [
		bind(AuthService).toClass(AuthService)
]