import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeRoutes } from '../Home/home.routes';
import { LoginRoutes } from '../Login/login.routes';
import { AppDownloadsRoutes } from '../Appdownloads/appdownloads.routes'
import { SettingsRoutes } from '../Settings/settings.routes'
import { ArticleRoutes } from '../Article/article.routes'
import { NotFoundRoutes } from '../Notfound/notfound.routes'

const routes: Routes = [
  ...HomeRoutes,
  ...LoginRoutes,
  ...AppDownloadsRoutes,
  ...SettingsRoutes,
  ...ArticleRoutes,
  ...NotFoundRoutes
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}