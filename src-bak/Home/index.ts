import { NgModule }       from '@angular/core'
import { CommonModule }   from '@angular/common'
import { FormsModule }    from '@angular/forms'
import { RouterModule } from '@angular/router'

import HomeComponent from './home.component'
import SidebarComponent from './sidebar.component'
import TagsComponent from './tags.component'
import ArticleListComponent from './articles.component'
import LoadMoreComponent from './loadmore.component'
import FooterComponent from './footer.component'
//import { TodoService } from './todo.service';
//import { MyTodoResolver } from './todo.resolver';
//import { MyTodoGuard, CanLeaveTodoDetailGuard } from './todo.guards';
import { CustomTimePipe,FormatDatePipe } from '../../pipes'
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  imports: [ CommonModule ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    TagsComponent,
    ArticleListComponent,
    LoadMoreComponent,
    FooterComponent,
    CustomTimePipe,
    FormatDatePipe,
  ],
  //providers:    [TodoService, MyTodoResolver, MyTodoGuard, CanLeaveTodoDetailGuard]
})
export class HomeModule {}