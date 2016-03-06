import { Component, OnInit } from 'angular2/core'
import { RouteParams, Router, CanActivate, ComponentInstruction } from 'angular2/router'
import { Hero, HeroService } from '../../services/hero.service'

@Component({
	selector: 'article',
	template: `
		<h1>文章详情页.</h1>
		<h3 *ngIf="hero">"{{hero.name}}"</h3>
		<button (click)="goToArticle(hero.id - 1)">上一篇.</button>
		<button (click)="goToHome()">回到首页.</button>
		<button (click)="goToArticle(hero.id + 1)">下一篇.</button>
	`
})
@CanActivate((next, prev) => {
	//路由器生命周期（钩子）
		console.log('路由器生命周期---CanActivate(将要进入路由.)')
		console.log(next.urlPath)
		console.log(prev)
	return true
})
export default class Article {
	public hero: Hero
	constructor(
		private _router: Router,
		private _routeParams: RouteParams,
		private _service: HeroService
	){}
	//组件生命周期, 创建组件
	ngOnInit(){
		console.log('article组件初始化')
		let id = this._routeParams.get('aid')
		this._service.getHero(id).then(hero => this.hero = hero)
	}
	//组件生命周期, 销毁组件
	ngOnDestroy(){
		console.log('article组件销毁')
	}
	ngOnChanges(){
		console.log('article组件发生改变')
	}
	goToHome(){
		this._router.navigate(['Home'])
	}
	goToArticle(id: number){
		this._router.navigate(['Article',{aid: id }])
	}
	routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) {
		console.log('路由生命周期---CanReuse(路由可以被重新加载)')
		return true;
	}
	routerOnReuse(next: ComponentInstruction, prev: ComponentInstruction) {
		console.log('路由生命周期---OnReuse(路由已重新加载)')
	}
	routerOnActivate(next: ComponentInstruction, prev: ComponentInstruction) {
		console.log('路由生命周期---OnActivate(路由被激活)')
	}
	routerCanDeactivate(){
		console.log('路由生命周期---CanDeactivate(将要离开路由)')
		return confirm('Are you sure you want to leave?');
	}
	routerOnDeactivate(next: ComponentInstruction, prev: ComponentInstruction) {
		console.log('路由生命周期---CanDeactivate(已经离开路由)')
	}
}