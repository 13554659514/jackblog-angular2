import { Component, EventEmitter } from 'angular2/core'
import { TagListModel,OptionsModel } from '../../models'

@Component({
	selector: 'load-more',
	inputs: ['isFetching', 'isMore', 'options', 'articleList'],
	outputs: ['addArticles'],
	template: `
	<div class="load-more" *ngIf="isMore && articleList && articleList.length > 0">
		  <button class="ladda-button" (click)="addData()">
		  	<span *ngIf="isFetching" class="ladda-spinner">
		  		<i class="fa fa-spinner fa-spin"></i>
		  	</span>
		  	<span *ngIf="!isFetching" class="ladda-label">点击查看更多</span>
		  </button>
	</div>
	`
})
export default class LoadMoreComponent {
	isFetching: boolean
	isMore:boolean
	options: OptionsModel
	addArticles: EventEmitter<boolean> = new EventEmitter<boolean>()
	addData(){
		let currentPage = this.options.currentPage
		let newOptions = new OptionsModel(
			++currentPage,
			this.options.itemsPerPage,
			this.options.sortName,
			this.options.tagId)
		this.addArticles.next({options:newOptions,isAdd:true})
	}
}