import { Component,OnInit } from '@angular/core';
import { ToasterModel } from './models'
import { ToasterService } from 'angular2-toaster/angular2-toaster'
import { ShowtoasterService } from './services'

@Component({
  selector: 'app',
  template: `
    <navbar-box></navbar-box>
    <router-outlet></router-outlet>
    <toaster-container></toaster-container>
    <modal></modal>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private toasterService: ToasterService,
    private showtoasterService: ShowtoasterService
  ) {}

  ngOnInit(){
    this.showtoasterService.toasterSubject.subscribe((toaster: ToasterModel) => {
      this.showtoaster(toaster.content,toaster.type)
    })
  }

  showtoaster(content:string,type:string = 'error',title:string = ''){
    this.toasterService.pop(type, title, content)
  }
}