import { Component, OnInit } from '@angular/core'
import {Location} from '@angular/common'
import {GlobalValService, AuthService} from '../../services'

@Component({
  selector: 'navbar-box',
  templateUrl: './index.html'
})
export default class NavbarComponent implements OnInit {
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