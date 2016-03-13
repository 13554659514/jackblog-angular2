import { Component, Host, Inject, forwardRef, OnChanges, SimpleChange } from 'angular2/core'
import { Router, CanActivate, ComponentInstruction } from 'angular2/router'
import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'
import { nicknameValidator } from '../../utils/validator'
import { AuthService } from '../../services'

@Component({
	selector: 'settings',
	directives: [FORM_DIRECTIVES],
	template: require('./index.html')
})
export default class SettingsComponent {
	settingsForm: ControlGroup
	nickname: AbstractControl
	userNickname:string = ''

	constructor(
		fb: FormBuilder,
		private authService: AuthService,
		private _router: Router){
		this.settingsForm = fb.group({
			'nickname': ['', Validators.compose([
					Validators.minLength(2),
					Validators.maxLength(15),
					Validators.required,
					nicknameValidator
				])]
		})
		this.nickname = this.settingsForm.controls['nickname']
		this.authService.userSubject.subscribe((user:any)=>{
			this.userNickname = user && user.nickname || ''
		})
	}

	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
		if(!this.authService.getCookie('token')){
			this._router.navigate(['Login'])
		}
		return true
	}

	onSubmit(user: Object): void {
		//提交登录
		this.authService.updateUser(user)
	}

}