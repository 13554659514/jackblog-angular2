import { Component} from '@angular/core'

@Component({
	selector: 'gotop',
	template:`
	<div [style.display]="isShowTop ? 'block' : 'none'" class="gotop" (click)="gotop()">
	    <i class="fa fa-arrow-up"></i>
	</div>
	`
})
export default class ScrollTopComponent {
	isShowTop: boolean = false
	constructor() {
		window.addEventListener('scroll', this.handleScroll.bind(this))
	}
	handleScroll(){
		if (window.scrollY > 200) {
		  this.isShowTop = true
		} else {
		  this.isShowTop = false
		}
	}
	gotop() {
		window.scrollTo(0, 0)
	}
}