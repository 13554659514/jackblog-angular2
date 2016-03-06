import { Component, View } from 'angular2/core'
import { NgIf } from 'angular2/common'
import { Http, Response } from 'angular2/http'

@Component({
	selector: 'simple-http',
	template: `
	<button type="button" (click)="makeRequest()">Make Request</button>
	<div *ngIf="loading">loading...</div>
	<pre>{{data | json}}</pre>
	`
})
export class SimpleHttpComponent {
		data: Object
		loading: boolean
		constructor(public http: Http){

		}
		makeRequest(): void{
			this.loading = true
			this.http.request('http://api.jackhu.top/article/getIndexImage')
			.subscribe((res: Response)=>{
				this.data = res.json()
				this.loading = false
			})
		}
}