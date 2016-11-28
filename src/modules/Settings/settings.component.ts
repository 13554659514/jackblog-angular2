import { Component, OnInit } from '@angular/core'
import { Router, CanActivate } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { nicknameValidator } from '../../validators'
import { AuthService } from '../../services'

@Component({
	selector: 'settings',
	templateUrl: './settings.component.html'
})
export default class SettingsComponent implements OnInit {
	settingsForm: FormGroup
	userNickname:string = ''

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private _router: Router
	){}

	ngOnInit(){
		this.settingsForm = this.fb.group({
			nickname: ['', [
					Validators.minLength(2),
					Validators.maxLength(15),
					Validators.required,
					nicknameValidator
				]
			]
		})
		this.authService.userSubject.subscribe((user:any)=>{
			this.userNickname = user && user.nickname || ''
		})
	}

	onSubmit(user: Object): void {
		//提交登录
		this.authService.updateUser(user)
	}

}