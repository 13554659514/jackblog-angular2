import { Component, ViewChild } from '@angular/core'

// todo: change to ng2-bootstrap
import { ModalDirective } from 'ng2-bootstrap/ng2-bootstrap'
// webpack html imports
// let template = require('./modal-demo.html');

@Component({
  selector: 'modal-demo',
  template: `
  <button class="btn btn-primary" (click)="lgModal.show()">Large modal</button>
    <div bsModal #lgModal="bs-modal" class="modal in" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title text-center">Large modal</h4>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
              <button type="button" (click)="lgModal.hide()" class="btn btn-xs btn-primary">Close</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ModalDemoComponent {
  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }
  public hideChildModal():void {
    this.childModal.hide();
  }
}