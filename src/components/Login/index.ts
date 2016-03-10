import {Component, Host, Inject, forwardRef } from 'angular2/core'
import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'
import { emailValidator } from '../../utils/validator'
import {
	GlobalValService,
	AuthService,
	ShowToasterService
} from '../../services'
import {ToasterContainerComponent, ToasterService} from '../toaster'
import {App} from '../../app'

@Component({
	selector: 'login',
	//moduleId: module.id,
	directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ToasterContainerComponent],
	providers: [ToasterService],
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
		public globalValService:GlobalValService,
		public authService: AuthService,
		private toasterService: ToasterService,
    private showToasterService: ShowToasterService,
    @Host() @Inject(forwardRef(()=> App)) app:App) {
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
		app.hello()
	}
	onSubmit(user: Object): void {
		//提交登录
		this.authService.localLogin(user)
	}

	ngOnInit(){
		this.globalValService.captchaUrlSubject.subscribe((captchaUrl:string) => {
			this.captchaUrl = captchaUrl
		})
		this.globalValService.indexImgSubject.subscribe((img:string)=>{
			console.log(img)
		})
		//当有错误提示时.
		this.authService.errMsgSubject.subscribe((errMsg:string)=>{
			this.changeCaptcha()
			console.log(errMsg)
			//this.showToasterService.showToaster(errMsg)
			this.toasterService.pop('error', '', errMsg)
		})
		//当登录成功时.
		this.authService.tokenSubject.subscribe((token:string)=>{
			//跳转
			console.log('我要跳转了.')
		})
		// this.showToasterService.showToasterSubject.subscribe((obj:any)=>{
  //     console.log('来了.')
  //     console.log(obj)
  //     if(obj.type && obj.content){
  //       this.toasterService.pop(obj.type, '', obj.content)
  //     }
  //   })
	}
	changeCaptcha(){
		this.globalValService.getCaptchaUrl()
	}
}