import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InComponent } from './auth/in/in.component';
import { UpComponent } from './auth/up/up.component';

const routes: Routes = [
  { path: 'sign-in', component: InComponent },
  { path: 'sign-up', component: UpComponent},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  exports:  [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
