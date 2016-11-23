import { Component } from '@angular/core';
@Component({
  selector: 'app',
  template: `
    <h1>My First Angular App</h1>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
// /*
//  * Angular 2 decorators and services
//  */
// import { Component, ViewEncapsulation } from '@angular/core';

// /*
//  * App Component
//  * Top Level Component
//  */
// @Component({
//   selector: 'app',
//   encapsulation: ViewEncapsulation.None,
//   template: `
//     <nav>
//       <span>
//           Index
//       </span>
//     </nav>

//     <main>
//       <router-outlet></router-outlet>
//     </main>
//   `
// })
// export class AppComponent {
//   name = 'Angular 2 Webpack Starter';
//   url = 'https://twitter.com/AngularClass';

//   // constructor() {

//   // }

//   ngOnInit() {
//     console.log('Initial App State');
//   }

// }