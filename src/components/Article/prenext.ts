import { Component, EventEmitter } from 'angular2/core'
import { PrenextArticleModel} from '../../models'
import { Router, ROUTER_DIRECTIVES, Location } from 'angular2/router'

@Component({
	selector: 'prenext',
	inputs: ['prenextArticle'],
	directives: [...ROUTER_DIRECTIVES],
	template: `
	<div class="prenext">
	  <div *ngIf="prenextArticle.prev._id" class="text-left prev">
	    <a [routerLink]="['Article', {aid:prenextArticle.prev._id}]" class="link-title"><span>上一篇:</span>{{prenextArticle.prev.title}} </a>
	  </div>
	  <div *ngIf="prenextArticle.next._id" class="text-right next">
	    <a [routerLink]="['Article', {aid:prenextArticle.next._id}]" class="link-title"><span>下一篇:</span> {{prenextArticle.next.title}}</a>
	  </div>
	</div>
	`
})
export default class PrenextComponent {
	prenextArticle:PrenextArticleModel
}