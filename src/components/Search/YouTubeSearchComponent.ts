/**
 * YouTubeSearchComponent is a tiny app that will autocomplete search YouTube.
 */

import {
Component,
Injectable,
bind,
OnInit,
ElementRef,
EventEmitter,
Inject
} from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs';

/*
  This API key may or may not work for you. Your best bet is to issue your own
  API key by following these instructions:
  https://developers.google.com/youtube/registering_an_application#Create_API_Keys

  Here I've used a **server key** and make sure you enable YouTube.

  Note that if you do use this API key, it will only work if the URL in
  your browser is "localhost"  AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk
*/
export var YOUTUBE_API_KEY: string = 'AIzaSyDZT6LVFzzWx35pEH67W1PFxjGpJFfETNc';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';
//let loadingGif: string = ((<any>window).__karma__) ? '' : require('images/loading.gif');
let loadingGif: string = ((<any>window).__karma__) ? '' : require('../../assets/images/tiny.gif')
//这是一个用来保存数据的model, 定义好数据结构.
class SearchResult {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.title = obj && obj.title || null;
    this.description = obj && obj.description || null;
    this.thumbnailUrl = obj && obj.thumbnailUrl || null;
    this.videoUrl = obj && obj.videoUrl ||
			`https://www.youtube.com/watch?v=${this.id}`;
  }
}

/**
 * YouTubeService connects to the YouTube API
 * See: * https://developers.google.com/youtube/v3/docs/search/list
 */
@Injectable()
export class YouTubeService {
  constructor(public http: Http,
		@Inject(YOUTUBE_API_KEY) private apiKey: string,
		@Inject(YOUTUBE_API_URL) private apiUrl: string) {
  }
  //API的请求都封装到service里, 返回一个Observable观察者对象, 或者叫做数据流.
  //而且返回的必须是SearchResult类型. 
  search(query: string): Observable<SearchResult[]> {
    let params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    let queryUrl: string = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).items.map(item => {
          // console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }
}

//变成了provider,注入到启动, 这样就不用分别注入service apikey apiurl
export var youTubeServiceInjectables: Array<any> = [
  bind(YouTubeService).toClass(YouTubeService),
  bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
  bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
];

/**
 * SearchBox displays the search box and emits events based on the results
 * 搜索框视图, outputs键指定了从这个组件将要被发射的事件列表。
 */

@Component({
  outputs: ['loading', 'results'],
  selector: 'search-box',
  template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
class SearchBox implements OnInit {
	//定义了两个事件类型.EventEmitter 就是一个Observable, 有emit, next, subscribe方法
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();
  //注入service, ElementRef, ElementRef是连接了angular包装了该组件的原始元素, 也就是该组件html节点,
  //只有一个方法.nativeElement
  constructor(public youtube: YouTubeService,
		private el: ElementRef) {
  }
  //RxJS提供一种方式来监听元素的事件，使用Rx.Observable.fromEvent
  //Rx.Observable.fromEvent(element, eventName, [selector]), 返回的是Observable对象
  ngOnInit(): void {
    // convert the `keyup` event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // extract the value of the input
      .filter((text: string) => text.length > 1) // filter out if empty
      .debounceTime(250)                         // only once every 250ms
      .do(() => this.loading.next(true))         // enable loading
      // search, discarding old events if new input comes in
      .map((query: string) => this.youtube.search(query))
      .switch()	//Switch订阅一个发射多个Observables的Observable
      // act on the return of the search
      .subscribe(
			(results: SearchResult[]) => { // on sucesss
				this.loading.next(false);
				this.results.next(results);
			},
			(err: any) => { // on error
				console.log(err);
				this.loading.next(false);
			},
			() => { // on completion
				this.loading.next(false);
			}
      );

  }
}
//单条结果组件.  
@Component({
  inputs: ['result'],
  selector: 'search-result',
  template: `
   <div class="col-sm-6 col-md-3">
      <div class="thumbnail">
        <img src="{{result.thumbnailUrl}}">
        <div class="caption">
          <h3>{{result.title}}</h3>
          <p>{{result.description}}</p>
          <p><a href="{{result.videoUrl}}"
                class="btn btn-default" role="button">Watch</a></p>
        </div>
      </div>
    </div>
  `
})
export class SearchResultComponent {
	//只有一个public SearchResult类型的属性, 也就是具有前面定义的model属性
  result: SearchResult;
}


//这是总视图, 上面两个是子视图.
@Component({
  selector: 'youtube-search',
  directives: [SearchBox, SearchResultComponent],
  template: `
  <div class='container'>
      <div class="page-header">
        <h1>YouTube Search
          <img
            style="float: right;"
            *ngIf="loading"
            src='${loadingGif}' />
        </h1>
      </div>

      <div class="row">
        <div class="input-group input-group-lg col-md-12">
          <search-box
             (loading)="loading = $event"
             (results)="updateResults($event)"
              ></search-box>
        </div>
      </div>

      <div class="row">
        <search-result
          *ngFor="#result of results"
          [result]="result">
        </search-result>
      </div>
  </div>
  `
})
export class YouTubeSearchComponent {
	//结果集体. SearchResult类型数组, 使用ngFor循环出来.
  results: SearchResult[];

  updateResults(results: SearchResult[]): void {
    this.results = results;
    // console.log("results:", this.results); // uncomment to take a look
  }
}
