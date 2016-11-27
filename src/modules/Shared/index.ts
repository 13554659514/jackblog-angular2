import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import ModalComponent from './modal.component'
import SnsLoginComponent from './snslogin.component'
import ScollTopComponent from './scrolltop.component'
import { ShowtoasterService } from '../../services'

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    ModalComponent,SnsLoginComponent,ScollTopComponent
  ],
  providers: [ ShowtoasterService ],
  exports: [ ModalComponent,SnsLoginComponent,ScollTopComponent ]
})
export class SharedModule {}