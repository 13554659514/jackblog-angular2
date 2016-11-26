import { Component,OnInit } from '@angular/core'
import { MobileAppsModel } from '../../models'
import { MobileService } from '../../services'

@Component({
	selector: 'app-downloads',
	template: require('./appdownloads.component.html')
})
export default class AppDownloadsComponent implements OnInit {
	apps: MobileAppsModel

	constructor(private mobileService: MobileService){}

	ngOnInit(){
		this.mobileService.mobileAppsSubject.subscribe((apps: MobileAppsModel) => {
			this.apps = apps
		})
	}
}