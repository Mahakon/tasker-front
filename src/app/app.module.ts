import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignComponent } from './auth/sign/sign.component';
import { InComponent } from './auth/in/in.component';
import { UpComponent } from './auth/up/up.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './cabinet/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { SignInService } from './services/sign-in.service';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    InComponent,
    UpComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    SignInService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
