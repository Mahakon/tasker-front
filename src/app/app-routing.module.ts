import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InComponent } from './auth/in/in.component';
import { UpComponent } from './auth/up/up.component';
import { UserComponent } from './cabinet/user/user.component';
import { SignComponent } from './auth/sign/sign.component';
import {CabinetComponent} from './cabinet/cabinet.component';
import {CabinetGuard} from './cabinet/cabinet.guard';
import {InGuard} from './auth/in/in.guard';
import {UpGuard} from './auth/up/up.guard';
import {CabinetResolver} from './cabinet/cabinet.resolver';

const routes: Routes = [
  {
    path: 'auth',
    component: SignComponent,
    children: [
      { path: 'sign-in', component: InComponent, canActivate: [InGuard] },
      { path: 'sign-up', component: UpComponent, canActivate: [UpGuard] },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
    ]
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [CabinetGuard],
    resolve: { user: CabinetResolver },
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
