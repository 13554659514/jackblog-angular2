import {Component} from '@angular/core'
import { MobileAppsModel } from '../../models'
import { MobileService } from '../../services'

@Component({
	selector: 'app-downloads',
	template: require('./index.html')
})
export default class AppDownloads {
	apps: MobileAppsModel
	constructor( mobileService: MobileService){
		mobileService.mobileAppsSubject.subscribe((apps: MobileAppsModel) => {
			this.apps = apps
		})
	}
}