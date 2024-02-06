import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddMessageComponent } from './components/message/add-message/add-message.component';
import { MessageDetailsComponent } from './components/message/message-details/message-details.component';
import { MessagesListComponent } from './components/message/messages-list/messages-list.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UsersListComponent } from './components/user/users-list/users-list.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    AddMessageComponent,
    MessageDetailsComponent,
    MessagesListComponent,
    AddUserComponent,
    UserDetailsComponent,
    UsersListComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
