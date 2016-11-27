import { Component, OnInit } from '@angular/core'
import { ArticleDetailModel } from '../../models'

@Component({
	selector: 'article-content',
	inputs: ['articleDetail'],
	template: `
	<div class="article-container">
	  <h1 class="title">{{ articleDetail.title }}</h1>
	  <div class="counts">
	    <span class="views-count">阅读{{articleDetail.visit_count}}</span>
	    <span class="comments-count">评论{{articleDetail.comment_count}}</span>
	    <span class="likes-count">喜欢{{articleDetail.like_count}}</span>
	  </div> 
	  <div class="markdown-content" [innerHTML]="articleDetail.content"></div>
	</div>
	`
})
export default class ArticleContentComponent {
	articleDetail: ArticleDetailModel
}