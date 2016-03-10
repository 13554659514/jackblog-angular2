import { Injectable, bind } from 'angular2/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from 'angular2/http'
import {Subject, BehaviorSubject, Observable} from 'rxjs'
import { API_ROOT, CookieDomain } from '../config'
import { Cookie } from './cookies'
import * as querystring from 'querystring'

@Injectable()
export class ResourceService {
		headers:Headers = new Headers()
		opts:RequestOptions = new RequestOptions()
		constructor(public http: Http) {
			this.headers.append('Content-Type', 'application/json')
			this.headers.append('Accept', 'application/json')
			if(Cookie.getCookie('token')){
				this.headers.append('Authorization',
					'Bearer ' + Cookie.getCookie('token').replace(/(^\")|(\"$)/g, ''))
			}
			this.opts.headers = this.headers
		}

		//登录请求.
		localLogin(data: Object): Observable<any> {
			return this.http.post(API_ROOT + 'auth/local', JSON.stringify(data), this.opts)
		}
		getSnsLogins(): Observable<any> {
				return this.http.get(API_ROOT + 'users/snsLogins', this.opts)
		}
		getMe(): Observable<any> {
				return this.http.get(API_ROOT + 'users/me', this.opts)
		}
		mdUser(data: Object): Observable<any> {
				return this.http.put(API_ROOT + 'users/mdUser', JSON.stringify(data), this.opts)
		}

		getTagList(): Observable<any> {
				return this.http.get(API_ROOT + 'tags/getFrontTagList', this.opts)
		}
		getApps(): Observable<any> {
				return this.http.get(API_ROOT + 'mobile/getApps', this.opts)
		}
		//article
		getIndexImage(): Observable<any> {
				return this.http.get(API_ROOT + 'article/getIndexImage', this.opts)
		}
		getFrontArticleList(options:Object): Observable<any> {
				let params: RequestOptions = new RequestOptions()
				params.search = new URLSearchParams(querystring.stringify(options))
				params.headers = this.headers
			return this.http.get(API_ROOT + 'article/getFrontArticleList', params)
		}
		getFrontArticleCount(): Observable<any> {
				return this.http.get(API_ROOT + 'article/getFrontArticleCount', this.opts)
		}
		getFrontArticle(id: string): Observable<any> {
				return this.http.get(API_ROOT + 'article/' + id + '/getFrontArticle', this.opts)
		}
		toggleLike(id: string): Observable<any> {
			return this.http.put(API_ROOT + 'article/' + id + '/toggleLike', '', this.opts)
		}
		getPrenext(id:string, options:Object): Observable<any> {
				let params: RequestOptions = new RequestOptions()
				params.search = new URLSearchParams(querystring.stringify(options))
				params.headers = this.headers
				return this.http.get(API_ROOT + 'article/' + id + '/getPrenext', params)
		}
		//comment
		getFrontCommentList(id:string): Observable<any> {
				return this.http.get(API_ROOT + 'article/' + id + '/getFrontCommentList', this.opts)
		}
		addNewComment(data: Object): Observable<any> {
				return this.http.post(API_ROOT + 'article/addNewComment', JSON.stringify(data), this.opts)
		}
		addNewReply(id:string,data:Object):Observable<any> {
				return this.http.post(API_ROOT + 'article/'+ id +'/addNewReply',
					JSON.stringify(data), this.opts)
		}
}


