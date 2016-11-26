import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { Routes, RouterModule } from '@angular/router'

import AppDownloadsComponent  from './appdownloads.component'

@NgModule({
  imports: [ CommonModule,HttpModule,RouterModule ],
  declarations: [ AppDownloadsComponent ]
})
export class AppDownloadsModule {}