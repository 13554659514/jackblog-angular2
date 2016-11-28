import { NgModule } from '@angular/core'
import { SharedModule } from '../Shared'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import ArticleComponent  from './article.component'
import CommentComponent  from './comment.component'
import ContentComponent  from './content.component'
import LikeComponent  from './like.component'
import ReplyComponent  from './reply.component'
import PrenextComponent  from './prenext.component'

@NgModule({
  imports: [ SharedModule,ReactiveFormsModule,RouterModule ],
  declarations: [
    ArticleComponent,
    CommentComponent,
    ContentComponent,
    LikeComponent,
    ReplyComponent,
    PrenextComponent
  ]
})
export class ArticleModule {}