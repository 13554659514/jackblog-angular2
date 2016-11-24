import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1>My First Angular App</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    console.log('Initial App State');
  }
}