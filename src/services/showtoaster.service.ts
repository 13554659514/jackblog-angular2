import { Injectable, bind } from 'angular2/core'
import {Subject, BehaviorSubject, Observable} from 'rxjs'

// export class ToasterContent {
// 	content:string
// 	type: string
// 	title: string
// 	constructor(
// 		public content:string,
// 		public type: string,
// 		public title?:string){
// 	}
// }


@Injectable()
export class ShowToasterService {
	showToasterSubject: Subject<any> = new Subject<any>()
	showToaster(content:string,type:string ='error'){
		console.log(content)
		this.showToasterSubject.next({content:content,type:type})
	}
}

export var ShowToasterServiceInjectables: Array<any> = [
		bind(ShowToasterService).toClass(ShowToasterService)
]