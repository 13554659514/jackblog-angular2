import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, Params } from '@angular/router'
import { ArticleDetailModel,PrenextArticleModel,ToasterModel, OptionsModel, CommentModel, ReplyModel} from '../../models'
import { ArticleService, AuthService, TagService, CommentService, ShowtoasterService } from '../../services'

@Component({
	selector: 'article',
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
export default class ArticleComponent implements OnInit {
	articleDetail: ArticleDetailModel
	aid:string
  user: Object
  prenextArticle:PrenextArticleModel
  options:OptionsModel
  commentList: CommentModel[]

	constructor(
		private route: ActivatedRoute,
		private articleService: ArticleService,
		private authService: AuthService,
		private tagService: TagService,
		private commentService: CommentService,
		private showtoasterService: ShowtoasterService
	) {
		this.authService.userSubject.subscribe((user:Object)=>{
			this.user = user
		})
	}

	ngOnInit() {
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
		this.route.params.subscribe(params => {
				this.aid = params['aid']
				this.authService.userSubject.subscribe((user:Object)=>{
					this.articleService.getArticleDetail(this.aid, this.user)
					this.articleService.getPrenext(this.aid,this.options)
					this.commentService.getCommentList(this.aid)
				})
		})
	}

	handleToggleLike(event:any){
		if(this.user){
			this.articleService.toggleLike(this.aid,this.articleDetail)
		}else{
			this.openLoginModal()
		}
	}
	openLoginModal(){
		this.showtoasterService.showModal()
	}
	handleSubmitComment(content:any){
		if (content.trim() === '') {
			this.showtoasterService.showToaster(new ToasterModel({content: '评论内容不能为空', type: 'error' }))
		}
	  if(this.user){
	  	this.commentService.addComment({aid:this.aid,content:content},this.commentList)
	  }else{
	    this.openLoginModal()
	  }
	}
	handleSubmitReply(cid:any,content:any){
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