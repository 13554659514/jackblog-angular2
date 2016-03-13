import { Component } from 'angular2/core'
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router'
import Home from './components/Home'
import Login from './components/Login'
import Settings from './components/Settings'
import AppDownloads from './components/Appdownloads'
import Article from './components/Article'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import ModalComponent from './components/Login/modal'
import {ToasterContainerComponent, ToasterService} from './components/toaster'
import { ShowtoasterService } from './utils/showtoaster'
import { ToasterModel } from './models'
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jackblog-sass/dist/index.css'
import './assets/styles/index.css'

@Component({
	selector: 'app',
  directives: [...ROUTER_DIRECTIVES, ToasterContainerComponent, Navbar, ModalComponent],
  providers: [ToasterService],
  template: `
    <navbar-box></navbar-box>
    <router-outlet></router-outlet>
    <toaster-container></toaster-container>
    <modal></modal>
  `
})
@RouteConfig([
		{ path: '/', name: 'Home', component: Home },
		{ path: '/login', name: 'Login', component: Login },
		{ path: '/settings', name: 'Settings', component: Settings },
    { path: '/appdownloads', name: 'AppDownloads', component: AppDownloads },
		{ path: '/article/:aid', name: 'Article', component: Article },
		{ path: '/404', name: 'NotFound', component: NotFound, useAsDefault: true }
])
export class App {
  constructor(private toasterService: ToasterService, showtoasterService: ShowtoasterService) {
    showtoasterService.toasterSubject.subscribe((toaster: ToasterModel) => {
      this.showtoaster(toaster.content,toaster.type)
    })
  }
  showtoaster(content:string,type:string = 'error',title:string = ''){
    this.toasterService.pop(type, title, content)
  }
}