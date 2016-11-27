import { Routes, RouterModule } from '@angular/router'
import ArticleComponent from './article.component'
//import { ArticleResolver } from './article.resolver'

export const ArticleRoutes: Routes = [
  {
    path: 'article/:aid',
    component: ArticleComponent,
    // resolve: {
    //   user: ArticleResolver
    // }
  }
]