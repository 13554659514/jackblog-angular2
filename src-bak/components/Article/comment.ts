import { Component, EventEmitter } from '@angular/core'
import {ArticleDetailModel} from '../../models'

@Component({
	selector: 'comment',
	inputs: ['user', 'commentList'],
	outputs: ['submitCommentEvent', 'submitReplyEvent', 'openLoginEvent'],
	template: require('./comment.html')
})
export default class CommentComponent {
  defaultAvatar = require('../../assets/images/avatar.png')
  user: Object
	submitCommentEvent: EventEmitter<any> = new EventEmitter<any>()
	submitReplyEvent: EventEmitter<any> = new EventEmitter<any>()
	openLoginEvent: EventEmitter<any> = new EventEmitter<any>()
	submitCommentContent:string = ''

	openLoginModal(){
		this.openLoginEvent.next(null)
	}
	submitComment(){
		this.submitCommentEvent.next(this.submitCommentContent)
		this.submitCommentContent = ''
	}
	submitReply(i:any,value:any,cid:any){
	  const eleForm = document.getElementById('replyForm' + i)
	  const eleTextarea = eleForm.getElementsByTagName('textarea')[0]
	  this.submitReplyEvent.next({cid:cid,content:eleTextarea.value})
	  eleTextarea.value = ''
	  eleForm.className += ' hide'
	}

	showReply(i:any,nickname:any){
		//判断是否登录.未登录则弹出登录框.
		if(this.user){
		  const eleForm = document.getElementById('replyForm' + i)
		  const eleTextarea = eleForm.getElementsByTagName('textarea')[0]
		  if(eleForm.className.indexOf('hide') !== -1){
		    eleForm.className = 'new-reply'
		    eleTextarea.focus()
		    eleTextarea.value = '@' + nickname + ' '
		  }else{
		    eleForm.className += ' hide'
		  }
		}else{
			this.openLoginEvent.next(null)
		}
	}

	goComment(){
	  const eleForm = document.getElementById('comment_content')
	  if(this.user){
	    eleForm.focus()
	  }else{
	    this.openLoginEvent.next(null)
	  }
	}
}