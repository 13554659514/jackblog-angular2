import { Routes, RouterModule } from '@angular/router'
import NotFoundComponent from './notfound.component'

export const NotFoundRoutes: Routes = [
  {
    path: '**',
    component: NotFoundComponent
  }
]