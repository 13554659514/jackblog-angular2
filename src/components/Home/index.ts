import { Component } from '@angular/core';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  styleUrls: ['./home.component.css'],
  //template: '<div>我的天啊.</div>',
  templateUrl:'./home.component.html'
})
export class HomeComponent {
  // Set our default values
  localState = { value: 'hello angular2 hmr' };
  // TypeScript public modifiers
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Home` component, hmr is ok.');
    // this.title.getData().subscribe(data => this.data = data);
  }
}
