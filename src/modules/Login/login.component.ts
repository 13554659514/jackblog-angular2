import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { emailValidator } from '../../validators'
import { GlobalValService, AuthService } from '../../services'

@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export default class LoginComponent implements OnInit  {
	signinForm: FormGroup
	captchaUrl: string
	logins: string[]
	constructor(
		private fb: FormBuilder,
		private globalValService:GlobalValService,
		private authService: AuthService
	) {}

	ngOnInit(){
		this.signinForm = this.fb.group({
				email: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(30),emailValidator]],
				password: ['', [Validators.required]],
				captcha: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
		})
		this.globalValService.captchaUrlSubject.subscribe((captchaUrl:string) => {
			this.captchaUrl = captchaUrl
		})
		this.authService.snsLoginsSubject.subscribe((logins:string[])=>{
			this.logins = logins
		})
	}

	onSubmit(user: Object): void {
		//提交登录
		this.authService.localLogin(user)
	}

	changeCaptcha(){
		this.globalValService.getCaptchaUrl()
	}
}