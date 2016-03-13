import { Component, EventEmitter } from 'angular2/core'
import {ArticleDetailModel} from '../../models'

@Component({
	selector: 'like',
	inputs: ['isLike', 'likeCount'],
	outputs: ['toggleLikeEvent'],
	template: `
	<div class="article-share clearfix">
	  <a href="javascript:;" class="like-btn" 
	  	[class.note-liked]="isLike" 
	  	(click)="toggleLike()">
	      <span class="like-content">
	        <i class="fa" 
	        [ngClass]="{'fa-heart': isLike, 'fa-heart-o': !isLike}"
	        ></i>  喜欢
	      </span>
	      <span class="like-count">{{ likeCount }}</span>        
	  </a>
	</div>
	`
})
export default class LikeComponent {
	isLike:boolean
	likeCount:number
	toggleLikeEvent: EventEmitter<any> = new EventEmitter<any>()

	toggleLike(){
		this.toggleLikeEvent.next(null)
	}
}