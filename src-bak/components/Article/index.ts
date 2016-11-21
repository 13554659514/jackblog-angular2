import { Component, OnInit } from 'angular2/core'
import { RouteParams, Router, CanActivate, ComponentInstruction } from 'angular2/router'
import ArticleContentComponent from './content'
import { ArticleDetailModel,PrenextArticleModel,ToasterModel, OptionsModel, CommentModel, ReplyModel} from '../../models'
import { ArticleService, AuthService, TagService, CommentService } from '../../services'
import LikeComponent from './like'
import PrenextComponent from './prenext'
import CommentComponent from './comment'
import GotopComponent from '../Scrolltop'
import { ShowtoasterService } from '../../utils/showtoaster'

@Component({
	selector: 'article',
	directives: [ArticleContentComponent, LikeComponent, PrenextComponent, CommentComponent, GotopComponent],
	template: `
	<div class="article-box">
	  <article-content [articleDetail]="articleDetail"></article-content>
	 	<like [likeCount]="articleDetail.like_count" [isLike]="articleDetail.isLike" (toggleLikeEvent)="handleToggleLike($event)"></like>
	  <prenext [prenextArticle]="prenextArticle"></prenext>
	  <comment [commentList]="commentList" [user]="user" 
	  	(submitCommentEvent)="handleSubmitComment($event)"
	  	(submitReplyEvent)="handleSubmitReply($event.cid,$event.content)"
	  	(openLoginEvent)="openLoginModal()"></comment>
	  <gotop></gotop>
	</div>
	`
})
export default class ArticleComponent {
	articleDetail: ArticleDetailModel
	aid:string
  user: Object
  prenextArticle:PrenextArticleModel
  options:OptionsModel
  commentList: CommentModel[]
	constructor(
		private _routeParams: RouteParams,
		private articleService: ArticleService,
		private authService: AuthService,
		private tagService: TagService,
		private commentService: CommentService,
		private showtoasterService: ShowtoasterService) {
		this.aid = _routeParams.get('aid')
		this.articleService.ArticleDetailSubject.subscribe((articleDetail:ArticleDetailModel)=>{
			this.articleDetail = articleDetail
		})
		this.articleService.prenextSubject.subscribe((prenextArticle:PrenextArticleModel)=>{
			this.prenextArticle = prenextArticle
		})
		this.tagService.optionSubject.subscribe((options: OptionsModel) => {
			this.options = options
		})
		this.commentService.commentListSubject.subscribe((commentList:CommentModel[])=>{
			this.commentList = commentList
		})
	}
	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
		this.authService.userSubject.subscribe((user:Object)=>{
		  this.user = user
		  this.articleService.getArticleDetail(this.aid, this.user)
		  this.articleService.getPrenext(this.aid,this.options)
		  this.commentService.getCommentList(this.aid)
		})
	}
	handleToggleLike(event){
		if(this.user){
			this.articleService.toggleLike(this.aid,this.articleDetail)
		}else{
			this.openLoginModal()
		}
	}
	openLoginModal(){
		this.showtoasterService.showModal()
	}
	handleSubmitComment(content){
		if (content.trim() === '') {
			this.showtoasterService.showToaster(new ToasterModel({content: '评论内容不能为空', type: 'error' }))
		}
	  if(this.user){
	  	this.commentService.addComment({aid:this.aid,content:content},this.commentList)
	  }else{
	    this.openLoginModal()
	  }
	}
	handleSubmitReply(cid,content){
		if (content.trim() === '') {
			this.showtoasterService.showToaster(new ToasterModel({content: '评论内容不能为空', type: 'error' }))
		}
	  if(this.user){
			this.commentService.addReply(cid, { content: content }, this.commentList)
	  }else{
	    this.openLoginModal()
	  }
	}
}