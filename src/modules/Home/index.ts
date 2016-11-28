import { NgModule } from '@angular/core'
import { SharedModule } from '../Shared'
import { Routes, RouterModule } from '@angular/router'

import HomeComponent from './home.component'
import SidebarComponent from './sidebar.component'
import TagsComponent from './tags.component'
import ArticleListComponent from './articles.component'
import LoadMoreComponent from './loadmore.component'
import FooterComponent from './footer.component'

@NgModule({
  imports: [ SharedModule,RouterModule ],
  declarations: [
    HomeComponent,
    SidebarComponent,
    TagsComponent,
    ArticleListComponent,
    LoadMoreComponent,
    FooterComponent
  ]
})
export class HomeModule {}