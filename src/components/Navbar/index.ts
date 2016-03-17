import { Component } from 'angular2/core'
import { GlobalValService, AuthService } from '../../services'
import { Location } from 'angular2/router'
import {DROPDOWN_DIRECTIVES} from 'ng2-bootstrap'

@Component({
  selector: 'navbar-box',
  directives: [DROPDOWN_DIRECTIVES],
  template: require('./index.html')
})
export default class Navbar {
  user: Object
  styleMode: string
  token: string
  defaultAvatar = require('../../assets/images/avatar.png')
  constructor(public globalValService: GlobalValService,
    public authService: AuthService,
    public location: Location) {}

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