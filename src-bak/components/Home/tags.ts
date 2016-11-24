import { Component, EventEmitter } from '@angular/core'
import { TagListModel,OptionsModel } from '../../models'

@Component({
	selector: 'tags',
	inputs: ['tagList', 'options', 'isFetching'],
	outputs: ['newOptions'],
	template: `
	<ul class="sort-tags list-unstyled clearfix">
	    <li>
	      <a [class.active]="options.sortName == 'publish_time'" (click)="changeSort('publish_time')" href="javascript:;">最新</a>
	    </li>
	    <li>
	      <a [class.active]="options.sortName == 'visit_count'" (click)="changeSort('visit_count')" href="javascript:;">热门</a>
	    </li>
	    <li *ngFor="#tag of tagList">
	      <a [class.active]="options.tagId == tag._id" (click)="changeTag(tag._id)" href="javascript:;">{{tag.name}}</a>
	    </li>
		  <li>
		    <img *ngIf="isFetching" class="loader-tiny" [src]="loadingImg" alt="Tiny">
		  </li>
	</ul>
	`
})
export default class TagsComponent {
	tagList: TagListModel
	options: OptionsModel
	isFetching:boolean
	loadingImg = require('../../assets/images/tiny.gif')
	newOptions: EventEmitter<OptionsModel> = new EventEmitter<OptionsModel>()

	constructor() {}
	changeSort(sortName:string) {
		let modifyOptions = new OptionsModel()
		modifyOptions.currentPage = 1
		modifyOptions.sortName = sortName
		modifyOptions.tagId = ''
		this.newOptions.next({ options: modifyOptions })
	}
	changeTag(tagId: string) {
		let modifyOptions = new OptionsModel()
		modifyOptions.currentPage = 1
		modifyOptions.sortName = ''
		modifyOptions.tagId = tagId
		this.newOptions.next({ options: modifyOptions })
	}
}