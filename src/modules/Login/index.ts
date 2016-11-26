import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { Routes, RouterModule } from '@angular/router'
import { BootstrapModule } from '../Bootstrap'

import LoginComponent  from './login.component'
//import SnsLoginComponent  from '../../common/Snslogin'
//import { TodoService } from './todo.service';
//import { MyTodoResolver } from './todo.resolver';
//import { MyTodoGuard, CanLeaveTodoDetailGuard } from './todo.guards';

@NgModule({
  imports: [ CommonModule,FormsModule,ReactiveFormsModule,HttpModule,RouterModule,BootstrapModule ],
  declarations: [ LoginComponent ],
  //providers:    [TodoService, MyTodoResolver, MyTodoGuard, CanLeaveTodoDetailGuard]
})
export class LoginModule {}