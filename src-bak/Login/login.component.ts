import {Component, Host, Inject, forwardRef } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import {
	FormBuilder,
	FormGroup,
	FormControl,
	Validators,
	AbstractControl } from '@angular/forms'
import { emailValidator } from '../../validators'
import { GlobalValService, AuthService } from '../../services'

@Component({
	selector: 'login',
	templateUrl: './login.component.html'
})
export default class LoginComponent {
	signinForm: FormGroup
	email: AbstractControl
	password: AbstractControl
	captcha: AbstractControl
	captchaUrl: string
	logins: string[]
	constructor(
		fb: FormBuilder,
		private _router: Router,
		public globalValService:GlobalValService,
		public authService: AuthService) {
		this.signinForm = fb.group({
			'email': ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(30),
				Validators.required,
				emailValidator
				])],
			'password': ['', Validators.required],
			'captcha': ['', Validators.compose([
				Validators.minLength(6),
				Validators.maxLength(6),
				Validators.required
			])]
		})
		this.email = this.signinForm.controls['email']
		this.password = this.signinForm.controls['password']
		this.captcha = this.signinForm.controls['captcha']
		this.globalValService.captchaUrlSubject.subscribe((captchaUrl:string) => {
			this.captchaUrl = captchaUrl
		})
		this.authService.snsLoginsSubject.subscribe((logins:string[])=>{
			this.logins = logins
		})
	}
	CanActivate() {
		if(this.authService.getCookie('token')){
			this._router.navigate(['Home'])
		}
		return true
	}

	onSubmit(user: Object): void {
		//提交登录
		this.authService.localLogin(user)
	}

	changeCaptcha(){
		this.globalValService.getCaptchaUrl()
	}
}