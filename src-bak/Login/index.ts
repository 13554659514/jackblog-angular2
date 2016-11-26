import { NgModule }       from '@angular/core'
import { CommonModule }   from '@angular/common'
import { FormsModule }    from '@angular/forms'

import SnsLoginComponent  from './snslogin.component'
import LoginComponent  from './login.component'
//import { TodoService } from './todo.service';
//import { MyTodoResolver } from './todo.resolver';
//import { MyTodoGuard, CanLeaveTodoDetailGuard } from './todo.guards';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ LoginComponent, SnsLoginComponent ],
  //providers:    [TodoService, MyTodoResolver, MyTodoGuard, CanLeaveTodoDetailGuard]
})
export class LoginModule {}