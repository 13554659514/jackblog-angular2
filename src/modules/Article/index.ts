import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../Shared'
import ArticleComponent  from './article.component'
import CommentComponent  from './comment.component'
import ContentComponent  from './content.component'
import LikeComponent  from './like.component'
import ReplyComponent  from './reply.component'
import PrenextComponent  from './prenext.component'
//import { FormatDatePipe } from '../../pipes'

@NgModule({
  imports: [ CommonModule,FormsModule,HttpModule,RouterModule,SharedModule ],
  declarations: [ ArticleComponent,CommentComponent,ContentComponent,LikeComponent,ReplyComponent,PrenextComponent ]
})
export class ArticleModule {}