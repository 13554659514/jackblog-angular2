import { Component } from 'angular2/core'
import { CORE_DIRECTIVES } from 'angular2/common'
import { GlobalValService, AuthService } from '../../services'
import { Router, ROUTER_DIRECTIVES, Location } from 'angular2/router'
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap'

@Component({
  selector: 'navbar-box',
  directives: [...ROUTER_DIRECTIVES, ...CORE_DIRECTIVES, DROPDOWN_DIRECTIVES],
  template: require('./index.html')
})
export default class Navbar {
  user: Object
  styleMode: string
  token: string
  defaultAvatar = require('../../assets/images/avatar.png')
  constructor(public globalValService: GlobalValService,
    public authService: AuthService) {}

  ngOnInit() {
    this.globalValService.styleModeSubject.subscribe((styleMode: string) => {
      this.styleMode = styleMode
    })
    this.authService.tokenSubject.subscribe((token:string)=>{
      this.token = token
    })
    this.authService.userSubject.subscribe((user:Object)=>{
      this.user = user
    })
  }

  changeMode() {
    this.globalValService.changeStyleModel(this.styleMode)
    document.body.className = this.styleMode
  }

  logout() {
    this.authService.logout()
  }

}