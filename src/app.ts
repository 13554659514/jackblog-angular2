import { Component } from 'angular2/core'
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router'
import Home from './components/Home'
import Login from './components/Login'
import Settings from './components/Settings'
import AppDownloads from './components/Appdownloads'
import Article from './components/Article'
import NotFound from './components/NotFound'

@Component({
	selector: 'app',
	directives: [...ROUTER_DIRECTIVES],
  template: `
  	<header>
  	  <nav>
  	  	<h1>My First Angular 2 Appss</h1>
  	    <ul>
  	      <li router-active>
  	        <a [routerLink]=" ['Home'] ">Home</a>
  	      </li>
  	      <li router-active>
  	        <a [routerLink]=" ['Login'] ">Login</a>
  	      </li>
  	      <li router-active>
  	        <a [routerLink]=" ['Settings'] ">Settings</a>
  	      </li>
  	      <li>
  	      	<a [routerLink]="['Article', {aid:12}]">Article</a>
  	      </li>
  	    </ul>
  	  </nav>
  	</header>
    <router-outlet></router-outlet>
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
export class App { }