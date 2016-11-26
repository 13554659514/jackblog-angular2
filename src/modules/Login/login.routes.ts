import { Routes, RouterModule } from '@angular/router'
import LoginComponent from './login.component'
import { LoginGuard } from './login.guards'

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivateChild: [LoginGuard]
  }
]