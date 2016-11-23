import { Injectable, bind } from '@angular2/core'
import {Subject, BehaviorSubject, Observable, ReplaySubject} from 'rxjs'
import { ToasterModel } from '../models'

@Injectable()
export class ShowtoasterService {
	toasterSubject: Subject<ToasterModel> = new ReplaySubject<ToasterModel>(1)
	modalSubject: Subject<boolean> = new BehaviorSubject<boolean>(false)
	showToaster(toaster:ToasterModel) {
		this.toasterSubject.next(toaster)
	}
	showModal(isShow:boolean = true){
		this.modalSubject.next(isShow)
	}
}