import { Component } from 'angular2/core'

@Component({
	selector: 'not-found',
	template: '<p class="not">404, 页面没有发现.</p>',
	styles: [`
		.not{
		  text-align: center;
		  font-size: 36px;
		  margin-top: 20%;
		}
	`]
})
export default class NotFound {}