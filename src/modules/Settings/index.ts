import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import SettingsComponent  from './settings.component'

@NgModule({
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,HttpModule,RouterModule ],
  declarations: [ SettingsComponent ]
})
export class SettingsModule {}