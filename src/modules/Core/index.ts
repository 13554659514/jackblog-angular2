import { NgModule,ModuleWithProviders,Optional,SkipSelf } from '@angular/core'
import { CommonModule }  from '@angular/common'
import {
  ResourceService,
  AuthService,
  ArticleService,
  TagService,
  CommentService,
  GlobalValService,
  MobileService,
  ShowtoasterService
} from '../../services'

@NgModule({
    imports: [ CommonModule ],
    providers: [
      ResourceService,
      AuthService,
      TagService,
      ArticleService,
      CommentService,
      GlobalValService,
      MobileService,
      ShowtoasterService
    ],
    declarations: []
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
