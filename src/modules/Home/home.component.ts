import { Component, OnInit } from '@angular/core'
import { TagService,GlobalValService } from '../../services'
import { TagListModel, OptionsModel, ArticleList } from '../../models'

@Component({
  selector: 'home',
	template: `
	<div class="container-fluid main-box">
	  <div class="row">
	  	<sidebar [indexImg]="indexImg"></sidebar>
	  	<div class="col-sm-7 col-sm-offset-3 main-content">
	  		<tags [isFetching]="isFetching" [tagList]="tagList" [options]="options" (newOptions)="handleChange($event)"></tags>
	  		<articles [articleList]="articleList"></articles>
				<load-more (addArticles)="handleChange($event)" 
					[options]="options" 
					[isMore]="isMore" 
					[articleList]="articleList" 
					[isFetching]="isFetching"></load-more>
	  	</div>
	  </div>
	</div>
	<footerbar></footerbar>
	`
})
export default class HomeComponent implements OnInit {
	tagList: TagListModel
	options: OptionsModel
	indexImg: any
	articleList: any[]
	isFetching: boolean
	isMore: boolean
	defaultIndexImg: any = require('../../assets/images/shanghai.jpg')

	constructor(
		private tagService: TagService,
		private globalValService: GlobalValService
	) {}

	ngOnInit(){
		this.globalValService.indexImgSubject.subscribe((indexImg:string)=>{
			this.indexImg = indexImg || this.defaultIndexImg
		})
		this.tagService.tagListSubject.subscribe((tagList:TagListModel)=>{
			this.tagList = tagList
		})
		this.tagService.optionSubject.subscribe((options:OptionsModel)=>{
			this.options = options
		})
		this.tagService.isFetchingSubject.subscribe((isFetching:boolean)=>{
			this.isFetching = isFetching
		})
		this.tagService.isMoreSubject.subscribe((isMore: boolean) => {
			this.isMore = isMore
		})
		this.tagService.articleListSubject.subscribe((articleList:any[])=>{
			this.articleList = articleList
		})
	}

	handleChange(event:any) {
		let options = event.options
		let isAdd = event.isAdd || false
		this.tagService.changeOptions(options)
		this.tagService.getArticleList(options,isAdd,this.articleList)
	}
}
