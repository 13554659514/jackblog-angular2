import {Component} from 'angular2/core'
import { SimpleHttpComponent } from './SimpleHTTPComponent'
import { YouTubeSearchComponent } from '../Search/YouTubeSearchComponent'

@Component({
	selector: 'home',
	directives: [SimpleHttpComponent, YouTubeSearchComponent],
	template: `
		<h1>首页.</h1>
		<simple-http></simple-http>
		<youtube-search></youtube-search>
	`
})
export default class Home {}