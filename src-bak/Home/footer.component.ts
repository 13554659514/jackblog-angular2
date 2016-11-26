import { Component } from '@angular/core'

@Component({
	selector: 'footerbar',
	template: `
	<footer>
	<div class="footer-container">
	  <ul>
	    <li>
	      <span>©2015 / 鄂ICP备15010989号-1</span>
	    </li>
	    <li>
	      <a class="github" href="https://github.com/jackhutu/jackblog-angular2" target="_blank">
	        <i class="fa fa-github"></i>
	      </a>
	    </li>
	    <li>
	      <a class="weibo" href="http://weibo.com/hutaigong" target="_blank">
	        <i class="fa fa-weibo"></i>
	      </a>
	    </li>
	  </ul>
	</div>
	</footer>
	`
})
export default class FooterComponent {}