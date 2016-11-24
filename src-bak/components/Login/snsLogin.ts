import { Component } from '@angular/core'
import { Cookie } from 'angular2-cookies'
import { API_ROOT } from '../../config'

@Component({
	selector: 'sns-login',
	inputs: ['logins'],
	template: `
	<div class="login-sns">
	  <ul>
	  	<li *ngFor="#item of logins" (click)="snsLogin($event,item)">
	  		<a class="{{item}}" href="javascript:;"><i class="fa fa-{{item}}"></i></a>
	  	</li>
	  </ul>
	</div>
	`
})
export default class SnsLoginComponent {
	logins: string[]
	snsLogin(e:any,provider:string):void {
		e.preventDefault()
		let search = API_ROOT + 'auth/' + provider + '?redirectUrl=' + window.location.origin
		const token = Cookie.load('token')
		if (token) {
		  search += '&access_token=' + token.replace(/(^\")|(\"$)/g, '')
		}
		window.location.href = search
	}
}