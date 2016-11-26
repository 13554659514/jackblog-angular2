import { Component,OnInit,ViewChild } from '@angular/core'
import { AuthService, ShowtoasterService } from '../../services'
import { ModalDirective } from 'ng2-bootstrap/components/modal/modal.component'

@Component({
	selector:'modal',
	templateUrl: './modal.component.html'
})
export default class ModalComponent implements OnInit {
	logins: string[]
	@ViewChild('childModal') public childModal:ModalDirective

	constructor(
		private authService: AuthService,
		private showtoasterService: ShowtoasterService
	) {}

	ngOnInit() {
		this.authService.snsLoginsSubject.subscribe((logins:string[])=>{
			this.logins = logins
		})

		this.showtoasterService.modalSubject.subscribe((showModal:boolean) => {
			showModal? this.childModal.show():  this.childModal.hide()
		})
	}
}