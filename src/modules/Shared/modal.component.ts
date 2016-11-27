import { Component,OnInit } from '@angular/core'
import { AuthService, ShowtoasterService } from '../../services'

@Component({
	selector:'modal',
	template: `
  <div class="modal-backdrop fade in"
	     [style.display]="showModal ? 'block' : 'none'"></div>
    <div class="modal in" [style.display]="showModal ? 'block' : 'none'">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title text-center">请用以下方式登录</h4>
          </div>
          <div class="modal-body">
              <div class="portlet-body">
                  <div class="login-sns">
                  <sns-login [logins]="logins"></sns-login>
                  </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" (click)="closeModal()" class="btn btn-xs btn-primary">Close</button>
          </div>
      </div>
    </div>
	</div>
  `
})
export default class ModalComponent implements OnInit {
	showModal: boolean
	logins: string[]

	constructor(
		private authService: AuthService,
		private showtoasterService: ShowtoasterService
	) {}

	ngOnInit() {
		this.authService.snsLoginsSubject.subscribe((logins:string[])=>{
			this.logins = logins
		})
		this.showtoasterService.modalSubject.subscribe((showModal:boolean) => {
			this.showModal = showModal
		})
	}

  closeModal(){
		this.showtoasterService.showModal(false)
	}
}