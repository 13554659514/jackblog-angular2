import { Injectable, bind } from 'angular2/core'
import { TagListModel, OptionsModel, ArticleList } from '../models'
import {Subject, BehaviorSubject, Observable, ReplaySubject} from 'rxjs'
import { ResourceService } from '../utils/resources'
import { Response } from 'angular2/http'

let initialArticleList: any[] = []

@Injectable()
export class TagService {
	articleListInitialState:ArticleList = new ArticleList()
	articleListSubject: Subject<any[]> = new ReplaySubject<any[]>(1)
	tagListSubject: Subject<TagListModel> = new ReplaySubject<TagListModel>(1)
	optionSubject: Subject<OptionsModel> = new BehaviorSubject<OptionsModel>(new OptionsModel())
	isFetchingSubject: Subject<boolean> = new BehaviorSubject<boolean>(this.articleListInitialState.isFetching)
	isMoreSubject: Subject<boolean> = new BehaviorSubject<boolean>(this.articleListInitialState.isMore)

	constructor(public rs: ResourceService) {
		this.getTagList()
		this.getArticleList(new OptionsModel())
	}

	getTagList():void{
		this.rs.getTagList()
			.subscribe((res:Response)=>{
				this.tagListSubject.next(res.json().data)
			}, (err: Response) => {
				this.tagListSubject.next(new TagListModel())
			})
	}
	changeOptions(options:OptionsModel){
		this.optionSubject.next(options)
	}
	getArticleList(options: OptionsModel, isAdd = false, prevArtilcles = initialArticleList): void {
		this.rs.getFrontArticleList(options)
			.do(() => this.isFetchingSubject.next(true))
			.map((res:Response)=>{
				let artricles = res.json().data
				if(artricles.length < options.itemsPerPage){
					this.isMoreSubject.next(false)
				}else{
					this.isMoreSubject.next(true)
				}
				return artricles
			})
			.reduce((acc, currentValue) => {
				if(isAdd){
					return [...acc, ...currentValue]
				}else{
					return [...currentValue]
				}
			}, prevArtilcles)
			.subscribe((artricles:any[])=>{
				this.isFetchingSubject.next(false)
				this.articleListSubject.next(artricles)
			},(err)=>{
				this.isFetchingSubject.next(false)
			},()=>{
				this.isFetchingSubject.next(false)
			})
	}

}

export var TagServiceInjectables: Array<any> = [
  bind(TagService).toClass(TagService)
]