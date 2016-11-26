import { Component, EventEmitter } from '@angular/core'
import { ArticleList } from '../../models'

@Component({
	selector: 'articles',
	inputs: ['articleList'],
	template: `
	<ul class="article-list list-unstyled clearfix">
		<li *ngFor="let article of articleList" class="article-item" [class.have-img]="article.images.length > 0">
			<a *ngIf="article.images.length > 0" [routerLink]="['Article', {aid:article._id}]" class="wrap-img">
				<img [src]="article.images[0].url + '-100x100'" />
			</a>
			<div>
			  <p class="list-top">               
			  <span class="time">{{ article.publish_time | customTime }}</span>
			  </p>
			  <h4 class="title">
			  	<a [routerLink]="['Article', {aid:article._id}]" class="link-title">{{article.title}}</a>
			  </h4>
			  <div class="list-footer">
			    <span>阅读 {{article.visit_count}}</span>
			    <span> · 评论 {{article.comment_count}}</span>        
			    <span> · 喜欢 {{article.like_count}}</span>
			  </div>
			</div>
		</li>
		<li *ngIf="articleList && articleList.length < 1" class="no-content">正在大力回车...</li>
	</ul>
	`
})
export default class ArticleListComponent {
	articleList: ArticleList
}