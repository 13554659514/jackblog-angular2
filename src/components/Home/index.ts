import {Component} from 'angular2/core'
import { TagService,GlobalValService } from '../../services'
import { TagListModel, OptionsModel, ArticleList } from '../../models'
import SidebarComponent from './sidebar'
import TagsComponent from './tags'
import ArticleListComponent from './articles'
import LoadMoreComponent from './loadmore'
import FooterComponent from './footer'

@Component({
	selector: 'home',
	directives: [SidebarComponent, TagsComponent, ArticleListComponent, LoadMoreComponent, FooterComponent],
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
export default class Home {
	tagList: TagListModel
	options: OptionsModel
	indexImg: string
	articleList: any[]
	isFetching: boolean
	isMore: boolean
	constructor(public tagService: TagService, globalValService: GlobalValService) {
		tagService.tagListSubject.subscribe((tagList:TagListModel)=>{
			this.tagList = tagList
		})
		tagService.optionSubject.subscribe((options:OptionsModel)=>{
			this.options = options
		})
		globalValService.indexImgSubject.subscribe((indexImg:string)=>{
			this.indexImg = indexImg
		})

		tagService.isFetchingSubject.subscribe((isFetching:boolean)=>{
			this.isFetching = isFetching
		})
		tagService.isMoreSubject.subscribe((isMore: boolean) => {
			this.isMore = isMore
		})
		tagService.articleListSubject.subscribe((articleList:any[])=>{
			this.articleList = articleList
		})
	}

	handleChange(event) {
		let options = event.options
		let isAdd = event.isAdd || false
		this.tagService.changeOptions(options)
		this.tagService.getArticleList(options,isAdd,this.articleList)
	}
}