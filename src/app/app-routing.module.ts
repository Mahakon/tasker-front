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
import {ProjectListComponent} from './cabinet/projects/project-list/project-list.component';
import {CurrentDashboardComponent} from './cabinet/dashboard/current-dashboard/current-dashboard.component';
import {CurrentDashboardGuard} from './cabinet/dashboard/current-dashboard/current-dashboard.guard';
import {CurrentDashboardResolver} from './cabinet/dashboard/current-dashboard/current-dashboard.resolver';
import {ShareComponent} from './cabinet/share/share.component';
import {ShareGuard} from './cabinet/share/share.guard';
import {HttpModule} from '@angular/http';



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
    path: 'share/:code',
    component: ShareComponent
  },
  {
    path: 'cabinet',
    component: CabinetComponent,
    canActivate: [CabinetGuard],
    resolve: { user: CabinetResolver },
    children: [
      { path: 'user', component: UserComponent },
      { path: 'projects', component: ProjectListComponent },
      {
        path: 'dashboard/:id',
        component: CurrentDashboardComponent,
        canActivate: [CurrentDashboardGuard],
        resolve: { tasks: CurrentDashboardResolver }
      },
      { path: '', redirectTo: 'dashboard/11', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  exports:  [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes), HttpModule ]
})
export class AppRoutingModule { }
