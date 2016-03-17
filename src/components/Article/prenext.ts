import { Component, EventEmitter } from 'angular2/core'
import { PrenextArticleModel} from '../../models'

@Component({
	selector: 'prenext',
	inputs: ['prenextArticle'],
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