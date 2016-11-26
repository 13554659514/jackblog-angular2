import {Component} from '@angular/core'
import { TagService,GlobalValService } from '../../services'
import { TagListModel, OptionsModel, ArticleList } from '../../models'

@Component({
  selector: 'home',
	template: `
	<div class="container-fluid main-box">
	  <div class="row">
	  	<sidebar [indexImg]="indexImg"></sidebar>

	  </div>
	</div>
	<footerbar></footerbar>
	`
})
export default class HomeComponent {
	tagList: TagListModel
	options: OptionsModel
	indexImg: any
	articleList: any[]
	isFetching: boolean
	isMore: boolean
	defaultIndexImg: any = require('../../assets/images/shanghai.jpg')

	constructor(public tagService: TagService, globalValService: GlobalValService) {
		globalValService.indexImgSubject.subscribe((indexImg:string)=>{
			this.indexImg = indexImg || this.defaultIndexImg
		})
		tagService.tagListSubject.subscribe((tagList:TagListModel)=>{
			this.tagList = tagList
		})
		tagService.optionSubject.subscribe((options:OptionsModel)=>{
			this.options = options
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

	handleChange(event:any) {
		let options = event.options
		let isAdd = event.isAdd || false
		this.tagService.changeOptions(options)
		this.tagService.getArticleList(options,isAdd,this.articleList)
	}
}
