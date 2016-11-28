import { NgModule } from '@angular/core'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../Shared'

import SettingsComponent  from './settings.component'

@NgModule({
  imports: [ SharedModule,ReactiveFormsModule,RouterModule ],
  declarations: [ SettingsComponent ]
})
export class SettingsModule {}