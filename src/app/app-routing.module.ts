import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InComponent } from './auth/in/in.component';
import { UpComponent } from './auth/up/up.component';
import { UserComponent } from './cabinet/user/user.component';
import { SignComponent } from './auth/sign/sign.component';
import {CabinetComponent} from './cabinet/cabinet.component';
import {CabinetGuard} from './cabinet/cabinet.guard';
import {InGuard} from './auth/in/in.guard';

const routes: Routes = [
  {
    path: 'auth',
    component: SignComponent,
    children: [
      { path: 'sign-in', component: InComponent, canActivate: [InGuard] },
      { path: 'sign-up', component: UpComponent },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
    ]
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [CabinetGuard],
    children: [
      {path: 'user', component: UserComponent}
    ]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  exports:  [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
