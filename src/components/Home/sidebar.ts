import { Component } from 'angular2/core'
import { GlobalValService } from '../../services'

@Component({
	selector: 'sidebar',
	inputs: ['indexImg'],
	template: `
	<div class="col-sm-3 sidebar-box">
	  <div class="cover-img" [ngStyle]="setStyles()"></div>
	  <div class="bottom-block">
	    <h1>Jack Hu</h1>
	    <h3>有朋自远方来</h3>
	    <h3>不亦乐乎</h3>
	  </div>
	</div>
	`
})
export default class SidebarComponent {
	indexImg:string
	constructor(globalValService: GlobalValService) {

	}
	setStyles(){
		return {
			backgroundImage: 'url(' + (this.indexImg) + ')'
		}
	}
}