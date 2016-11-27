import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap'

import NavbarComponent from './navbar.component'

@NgModule({
  imports: [ CommonModule,RouterModule,HttpModule,DropdownModule ],
  declarations: [
    NavbarComponent
  ],
  exports: [ NavbarComponent ]
})
export class NavbarModule {}