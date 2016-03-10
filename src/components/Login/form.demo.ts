import { Component } from 'angular2/core'
import {
  CORE_DIRECTIVES,
	FORM_DIRECTIVES,
	FormBuilder,
	ControlGroup,
	Control,
	Validators,
	AbstractControl } from 'angular2/common'


//FORM_DIRECTIVES包含了,
// ngControl
// ngControlGroup
// ngForm 将自动附加在选择器元素中的form上, 只要注入了FORM_DIRECTIVES包含了
//NgForm提供给我们两个重要功能:
//1. 一个名为ngForm的ControlGroup
//2 . 一个submit的事件
// #f="ngForm" ngForm对象创建一个f变量的别名
// ngModel
@Component({
	selector: 'demo-form-sku',
	directives: [FORM_DIRECTIVES],
	template: `
	<div class="ui raised segment">
	    <h2 class="ui header">Demo Form: Sku</h2>

	    <form #f="ngForm"
	          (ngSubmit)="onSubmit(f.value)"
	          class="ui form">
	        <div class="field">
	            Forms in Angular 2 125
	            <label for="skuInput">SKU</label>
	            <input type="text"
	        			id="skuInput" 
	        			placeholder="SKU" ngControl="sku">
	        </div>
	        <button type="submit" class="ui button">Submit</button>
	    </form>
	</div>
	`
})
export class DemoFormSku {
	constructor(){}
	onSubmit(value):void {
		console.log('you submitted value: ', value)
	}
}


//通过使用ngForm和ngControl方便的隐式的构建Control和ControlGroups，
//但并没有给我们提供了更多定制选项。
//要隐式的创建一个新的ControlGroup和Controls,使用ng-form和ng-control
//要绑定自己的ControlGroup和Controls使用ng - form - model和ng - form - control
@Component({
	selector: 'demo-form-sku-builder',
	directives: [FORM_DIRECTIVES],
	template:`
		<div class="ui raised segment">
		    <h2 class="ui header">Demo Form: Sku</h2>

		    <form [ngFormModel]="myForm"
		          (ngSubmit)="onSubmit(myForm.value)"
		          class="ui form">
		        <div class="field">
		            Forms in Angular 2 125
		            <label for="skuInput">SKU</label>
		            <input type="text"
		        			id="skuInput" 
		        			placeholder="SKU-Builder" 
		        			[ngFormControl]="myForm.controls['sku']">
		        </div>
		        <button type="submit" class="ui button">Submit</button>
		    </form>
		</div>
	`
})
export class DemoFormSkuBuilder{
	myForm: ControlGroup
	constructor(fb: FormBuilder){
		//创建一个ControlGroup
		this.myForm = fb.group({
				'sku': ['ABC123']
		})
	}
	onSubmit(value:string):void {
	    console.log('you submitted value: ', value);
	}
}

//添加自定义验证器
function skuValidator(control: Control): { [s: string]: boolean } {
  if (!control.value.match(/^123/)) {
    return {invalidSku: true};
  }
}
//添加验证Validators模块
//1.分配给Control对象一个validator
//2. 在视图中检查验证器的状态, 并相应地采取行动
@Component({
	selector: 'demo-form-sku-builder-validator',
	directives: [FORM_DIRECTIVES],
	template:`
	<div class="ui raised segment">
	  <h2 class="ui header">Demo Form: with validations (explicit)</h2>
	  <form [ngFormModel]="myForm" 
	        (ngSubmit)="onSubmit(myForm.value)"
	        class="ui form">

	    <div class="field"
	        [class.error]="!sku.valid && sku.touched">
	      <label for="skuInput">SKU</label>
	      <input type="text" 
	             id="skuInput" 
	             placeholder="SKU"
	             [ngFormControl]="sku">
	       <div *ngIf="!sku.valid" 
	         class="ui error message">SKU is invalid</div>
	       <div *ngIf="sku.hasError('required')"
	         class="ui error message">SKU is required</div>
	       <div *ngIf="sku.hasError('invalidSku')" 
	       	 class="bg-warning">SKU must begin with <tt>123</tt></div>

	    </div>

	    <h2>sku ngModel 的值 : {{skuModel}}</h2>
	    <div class="field">
	      <label for="skuModel">skuModel</label>
	      <input type="text" 
	             id="skuModel" 
	             placeholder="skuModel"
	             [ngFormControl]="myForm.find('skuModel')"
	             [(ngModel)]="skuModel">

	    </div>

	    <div *ngIf="!myForm.valid"
	      class="ui error message">Form is invalid</div>
	    <button type="submit" class="ui button">Submit</button>
	  </form>
	</div>
	`
})
export class DemoFormWithValidationsExplicit {
	myForm: ControlGroup
	sku: AbstractControl
	skuModel: string
	constructor(fb: FormBuilder) {
	  this.myForm = fb.group({
	    'sku':  ['', Validators.compose([
	    	Validators.required, skuValidator])],
			'skuModel': ['sku model']
	  });

	  this.sku = this.myForm.controls['sku']

	  this.sku.valueChanges.subscribe((value:string) => {
	          console.log('sku changed to: ', value)
	      }
	  )
	  this.myForm.valueChanges.subscribe((value:string) => {
	          console.log('form changed to: ', value)
	      }
	  )
	}

	onSubmit(value: string): void {
	  console.log('you submitted value: ', value)
	}


}


@Component({
  selector: 'demo-form-ng-model',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: `
  <div class="ui raised segment">
    <h2 class="ui header">Demo Form: with ng-model</h2>

    <div class="ui info message">
      The product name is: {{productName}}
    </div>

    <form [ngFormModel]="myForm"
          (ngSubmit)="onSubmit(myForm.value)"
          class="ui form">

      <div class="field">
        <label for="productNameInput">Product Name</label>
        <input type="text"
               id="productNameInput"
               placeholder="Product Name"
               [ngFormControl]="myForm.find('productName')"
               [(ngModel)]="productName">
      </div>

      <div *ngIf="!myForm.valid"
        class="ui error message">Form is invalid</div>
      <button type="submit" class="ui button">Submit</button>
    </form>

  </div>
  `
})
export class DemoFormNgModel {
  myForm: ControlGroup;
  productName: string;

  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'productName':  ['', Validators.required]
    });
  }

  onSubmit(value: string): void {
    console.log('you submitted value: ', value);
  }
}
