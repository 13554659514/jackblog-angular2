import { Injectable } from '@angular/core'
import { CommentModel,ReplyModel,ToasterModel } from '../models'
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs'
import { ResourceService } from '../utils/resources'
import { Response } from '@angular/http'
import { ShowtoasterService } from '../utils/showtoaster'

@Injectable()
export class CommentService {
	commentListInitialState: CommentModel[] = [
		new CommentModel()
	]
	commentListSubject: Subject<CommentModel[]> = new BehaviorSubject<CommentModel[]>(this.commentListInitialState)
	constructor(public rs: ResourceService,
		private showtoasterService: ShowtoasterService) {}

	getCommentList(id: string) {
		this.rs.getFrontCommentList(id)
			.subscribe((res:Response) => {
				this.commentListSubject.next(res.json().data)
			}, (err: Response) => {
				this.commentListSubject.next(this.commentListInitialState)
			})
	}

	addComment(data:any,comments:CommentModel[]) {
		this.rs.addNewComment(data)
			.subscribe((res:Response) => {
				comments.push(res.json().data)
				this.commentListSubject.next(comments)
				this.showtoasterService.showToaster(new ToasterModel({
					type:'success',
					content:'添加评论成功.'
				}))
			}, (err: Response) => {
				this.commentListSubject.next(comments)
				this.showtoasterService.showToaster(new ToasterModel({
					type:'error',
					content:'添加评论失败.'
				}))
			})
	}

	addReply(cid: string, data: any, comments: CommentModel[]): void {
		this.rs.addNewReply(cid,data)
			.map((res: Response) => {
				let replys = res.json().data
				let newComment = comments.map((item)=>{
					if(item._id === cid){
						item.replys = replys
					}
					return item
				})
				return newComment
			})
			.subscribe((newComment: CommentModel[]) => {
				this.commentListSubject.next(newComment)
				this.showtoasterService.showToaster(new ToasterModel({
					type:'success',
					content:'添加回复成功.'
				}))
			}, (err: Response) => {
				this.commentListSubject.next(comments)
				this.showtoasterService.showToaster(new ToasterModel({
					type:'error',
					content:'添加回复失败.'
				}))
			})
	}
}

// export var CommentServiceInjectables: Array<any> = [
//   bind(CommentService).toClass(CommentService)
// ]