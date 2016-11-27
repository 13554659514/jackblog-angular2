import { NgModule } from '@angular/core'
import { CommonModule }  from '@angular/common'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'
import { ResourceService } from '../../services'

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
    ],
    providers: [
      ResourceService
    ],
    declarations: [],
    exports: [
        CommonModule,
        HttpModule,
        FormsModule,
    ]
})
export class CoreModule {}
