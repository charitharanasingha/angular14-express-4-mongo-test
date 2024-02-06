import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesListComponent } from './components/message/messages-list/messages-list.component';
import { MessageDetailsComponent } from './components/message/message-details/message-details.component';
import { AddMessageComponent } from './components/message/add-message/add-message.component';
import { UsersListComponent } from './components/user/users-list/users-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesListComponent },
  { path: 'messages/add', component: AddMessageComponent },
  { path: 'messages/:id', component: MessageDetailsComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }