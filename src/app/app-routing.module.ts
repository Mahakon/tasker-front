import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InComponent } from './auth/in/in.component';
import { UpComponent } from './auth/up/up.component';
import { UserComponent } from './cabinet/user/user.component';
import { SignComponent } from './auth/sign/sign.component';

const routes: Routes = [
  {
    path: 'auth',
    component: SignComponent,
    children: [
      { path: 'sign-in', component: InComponent },
      { path: 'sign-up', component: UpComponent },
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' }
    ]
  },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  exports:  [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
