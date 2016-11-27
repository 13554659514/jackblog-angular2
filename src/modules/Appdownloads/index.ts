import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { Routes, RouterModule } from '@angular/router'

import AppDownloadsComponent  from './appdownloads.component'
import { MobileService } from '../../services'

@NgModule({
  imports: [ CommonModule,HttpModule,RouterModule ],
  declarations: [ AppDownloadsComponent ],
  providers: [ MobileService ]
})
export class AppDownloadsModule {}