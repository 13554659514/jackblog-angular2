import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import HomeComponent from './home.component'

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
]

// // export const routing = RouterModule.forChild(HomeRoutes);


// const routes: Routes = [
//   {
//     path: '/',
//     component: HomeComponent
//   }
// ];

// @NgModule({
//   imports: [ RouterModule.forChild(routes) ],
//   exports: [ RouterModule ]
// })
// export class HomeRoutingModule { }