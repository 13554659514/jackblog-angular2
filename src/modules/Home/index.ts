import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'

import { CustomTimePipe } from '../../pipes'

import HomeComponent from './home.component'
import SidebarComponent from './sidebar.component'
import TagsComponent from './tags.component'
import ArticleListComponent from './articles.component'
import LoadMoreComponent from './loadmore.component'
import FooterComponent from './footer.component'

import { TagService } from '../../services'

@NgModule({
  imports: [ CommonModule,FormsModule,HttpModule,RouterModule ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    TagsComponent,
    ArticleListComponent,
    LoadMoreComponent,
    FooterComponent,
    CustomTimePipe
  ],
  providers: [ TagService ]
})
export class HomeModule {}