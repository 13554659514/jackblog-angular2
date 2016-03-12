import { Injectable, bind } from 'angular2/core'
import { MobileAppsModel } from '../models'
import {Subject, BehaviorSubject, Observable, ReplaySubject} from 'rxjs'
import { ResourceService } from '../utils/resources'
import { Response } from 'angular2/http'

@Injectable()
export class MobileService {
	mobileInitialState: MobileAppsModel = new MobileAppsModel()

	mobileAppsSubject: Subject<MobileAppsModel> = new ReplaySubject<MobileAppsModel>(1)

	constructor(public rs: ResourceService) {
		this.getMobileApps()
	}

	getMobileApps(): void {
		this.rs.getApps()
			.subscribe((res: Response) => {
				this.mobileAppsSubject.next(res.json().data)
			}, (err: Response) => {
				this.mobileAppsSubject.next(this.mobileInitialState)
			})
	}

}

export var MobileServiceInjectables: Array<any> = [
  bind(MobileService).toClass(MobileService)
]