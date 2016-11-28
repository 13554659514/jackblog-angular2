import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../Shared'

import NotFoundComponent  from './notfound.component'

@NgModule({
  imports: [ SharedModule,RouterModule ],
  declarations: [ NotFoundComponent ]
})
export class NotFoundModule {}