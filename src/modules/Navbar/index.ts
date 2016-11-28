import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap'
import { SharedModule } from '../Shared'

import NavbarComponent from './navbar.component'

@NgModule({
  imports: [ SharedModule,RouterModule,DropdownModule ],
  declarations: [
    NavbarComponent
  ],
  exports: [ NavbarComponent ]
})
export class NavbarModule {}