import { Component, Host, Inject, forwardRef, OnChanges, SimpleChange } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl } from '@angular/forms'
import { nicknameValidator } from '../../utils/validator'
import { AuthService } from '../../services'

@Component({
	selector: 'settings',
	template: require('./index.html')
})
export default class SettingsComponent {
	settingsForm: FormGroup
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

	CanActivate() {
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