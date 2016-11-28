import { NgModule } from '@angular/core'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../Shared'

import LoginComponent  from './login.component'

@NgModule({
  imports: [ SharedModule,ReactiveFormsModule,RouterModule ],
  declarations: [ LoginComponent ]
})
export class LoginModule {}