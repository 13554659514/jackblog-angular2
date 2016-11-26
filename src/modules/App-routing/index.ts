import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutes } from '../Home/home.routes';
import { LoginRoutes } from '../Login/login.routes';
import { AppDownloadsRoutes } from '../Appdownloads/appdownloads.routes'
import NotFoundComponent from './notfound.component'

const routes: Routes = [
  ...HomeRoutes,
  ...LoginRoutes,
  ...AppDownloadsRoutes,
  {
    path:'**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [ NotFoundComponent ],
  exports: [
    RouterModule,NotFoundComponent
  ]
})
export class AppRoutingModule {}