import {Component, Host, Inject, forwardRef } from 'angular2/core'
import { Router, CanActivate, ComponentInstruction } from 'angular2/router'
import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'
import { emailValidator } from '../../utils/validator'
import { GlobalValService, AuthService } from '../../services'
import {App} from '../../app'

@Component({
	selector: 'login',
	//moduleId: module.id,
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
	template: require('./index.html')
	//templateUrl: 'index.html'
})
export default class Login {
	signinForm: ControlGroup
	email: AbstractControl
	password: AbstractControl
	captcha: AbstractControl
	captchaUrl: string

	constructor(
		fb: FormBuilder,
		private _router: Router,
		public globalValService:GlobalValService,
		public authService: AuthService,
    @Host() @Inject(forwardRef(() => App)) private app: App) {
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
	}
	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
		if(this.authService.getCookie('token')){
			this._router.navigate(['Home'])
		}
		return true
	}

	ngOnInit(){
		this.globalValService.captchaUrlSubject.subscribe((captchaUrl:string) => {
			this.captchaUrl = captchaUrl
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