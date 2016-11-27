import { NgModule, ApplicationRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr'
//第三方模块
// import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap'
import { ToasterModule } from 'angular2-toaster/angular2-toaster'

// 环境
import { ENV_PROVIDERS } from './env'
// hmr service
import { AppState, InternalStateType } from './app.service'
// services
import {
  ResourceService,
  ShowtoasterService,
  AuthService,
  ArticleService,
  CommentService,
  GlobalValService,
  MobileService
} from './services'

// components
import { AppComponent } from './app.component'
//模块
import { AppRoutingModule } from './modules/app-routing'
import { HomeModule } from './modules/Home'
import { LoginModule } from './modules/Login'
import { NavbarModule } from './modules/Navbar'
import { SharedModule } from './modules/Shared'
import { AppDownloadsModule } from './modules/Appdownloads'
import { SettingsModule } from './modules/Settings'
import { ArticleModule } from './modules/Article'
//css
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jackblog-sass/dist/index.css'
import './assets/styles/index.css'

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  ResourceService,
  AuthService,
  ArticleService,
  CommentService,
  GlobalValService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    NavbarModule,
    ToasterModule,
    HomeModule,
    LoginModule,
    AppDownloadsModule,
    SettingsModule,
    ArticleModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

