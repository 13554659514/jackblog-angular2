import { Component } from 'angular2/core'

@Component({
	selector: 'settings',
	template: '<h1>设置页面</h1>'
})
export default class Settings {
	constructor(){
		console.log('构造函数')
	}
	ngOnChanges(){
		console.log('当输入/输出绑定的值改变时调用')
	}
	ngOnInit(){
		console.log('在第一次 ngOnChanges 后调用')
	}
	ngDoCheck(){
		console.log('自定义的方法，检测和处理值的改变')
	}
	ngAfterContentInit(){
		console.log('在组件内容初始化之后调用')
	}
	ngAfterContentChecked(){
		console.log('组件每次检查内容时调用')
	}
	ngAfterViewInit(){
		console.log('组件相应的视图初始化之后调用')
	}
	ngAfterViewChecked(){
		console.log('组件每次检查视图时调用')
	}
	ngOnDestroy(){
		console.log('指令销毁前调用。')
	}
}