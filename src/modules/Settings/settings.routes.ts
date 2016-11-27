import { Routes, RouterModule } from '@angular/router'
import SettingsComponent from './settings.component'
import { SettingsGuard } from './settings.guards'

export const SettingsRoutes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivateChild: [SettingsGuard]
  }
]