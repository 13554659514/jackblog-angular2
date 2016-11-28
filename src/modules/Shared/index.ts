import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { CustomTimePipe } from '../../pipes'

import ModalComponent from './modal.component'
import SnsLoginComponent from './snslogin.component'
import ScollTopComponent from './scrolltop.component'

@NgModule({
  imports: [ CommonModule,HttpModule,FormsModule ],
  declarations: [
    CustomTimePipe,ModalComponent,SnsLoginComponent,ScollTopComponent
  ],
  exports: [ CommonModule,HttpModule,FormsModule,CustomTimePipe,ModalComponent,SnsLoginComponent,ScollTopComponent ]
})
export class SharedModule {}