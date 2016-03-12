import { Injectable, bind } from 'angular2/core'
import { Http, Response } from 'angular2/http'
import { GlobalValModel } from '../models'
import {Subject, BehaviorSubject, Observable, ReplaySubject} from 'rxjs'
import { API_ROOT } from '../config'

@Injectable()
export class GlobalValService {
	globalVal: GlobalValModel = new GlobalValModel()
	captchaUrlSubject: Subject<string> = new BehaviorSubject<string>(this.globalVal.captchaUrl)
	styleModeSubject: Subject<string> = new BehaviorSubject<string>(this.globalVal.styleMode)
	indexImgSubject: Subject<string> = new ReplaySubject<string>(1)
	constructor(public http: Http){
		this.getIndexImg()
	}

	changeStyleModel(styleMode:string){
		this.styleModeSubject.next((styleMode === 'day-mode') ? 'night-mode' : 'day-mode')
	}
	getCaptchaUrl(){
		let captchaUrl = API_ROOT + 'users/getCaptcha?' + Math.random()
		this.captchaUrlSubject.next(captchaUrl)
	}
	getIndexImg(): Observable<string> {
		return this.http.get(API_ROOT + 'article/getIndexImage')
			.map((res:Response)=>{
				return res.json().img
			})
	}
}

export var GlobalValServiceInjectables: Array<any> = [
  bind(GlobalValService).toClass(GlobalValService)
]