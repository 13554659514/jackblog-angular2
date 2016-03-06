import {Component} from 'angular2/core'
import { SimpleHttpComponent } from './SimpleHTTPComponent'

@Component({
	selector: 'home',
	directives: [ SimpleHttpComponent ],
	template: `
		<h1>首页.</h1>
		<simple-http></simple-http>
	`
})
export default class Home {}