import { Component } from 'angular2/core'
//import { Cookie } from 'ng2-cookies/ng2-cookies'
import { API_ROOT } from '../../config'

@Component({
	selector: 'sns-login',
	inputs: ['logins'],
	template: `
	<div class="login-sns">
	  <ul>
	  	<li v-for="item in logins" (click)="snsLogin(item)">
	  		<a class="{{item}}" href="#"><i class="fa fa-{{item}}"></i></a>
	  	</li>
	  </ul>
	</div>
	`
})
export class SnsLogin {
	logins: string[]
	snsLogin(provider:string):void {
		let search = API_ROOT + 'auth/' + provider + '?redirectUrl=' + window.location.origin
		// const token = Cookie.getCookie('token')
		// if (token) {
		//   search += '&access_token=' + token.replace(/(^\")|(\"$)/g, "")
		// }
		window.location.href = search
	}
}