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
import {CabinetComponent} from './cabinet/cabinet.component';
import {ButtonMenuComponent} from './cabinet/components/button-menu/button-menu.component';
import {CabinetGuard} from './cabinet/cabinet.guard';
import {InGuard} from './auth/in/in.guard';

@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    InComponent,
    UpComponent,
    CabinetComponent,
    UserComponent,
    ButtonMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    SignInService,
    CabinetGuard,
    InGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
