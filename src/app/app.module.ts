import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './cabinet/user/user.component';
import { UserService } from './user.service';
import {HttpClientModule} from '@angular/common/http';
import {SignUpComponent} from './sign/sign-up/sign-up.component';


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
