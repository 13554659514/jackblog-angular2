import { Component } from '@angular/core';
import { ToasterModel } from './models'
import { ToasterService } from 'angular2-toaster/angular2-toaster'
import { ShowtoasterService } from './services'

@Component({
  selector: 'app',
  template: `
    <navbar-box></navbar-box>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private toasterService: ToasterService, showtoasterService: ShowtoasterService) {
    showtoasterService.toasterSubject.subscribe((toaster: ToasterModel) => {
      this.showtoaster(toaster.content,toaster.type)
    })
  }
  showtoaster(content:string,type:string = 'error',title:string = ''){
    this.toasterService.pop(type, title, content)
  }
}