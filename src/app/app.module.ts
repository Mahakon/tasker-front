import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SignComponent } from './auth/sign/sign.component';
import { InComponent } from './auth/in/in.component';
import { UpComponent } from './auth/up/up.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './cabinet/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserService } from './services/cabinet/user/user.service';
import { SignInService } from './services/sign/sign-in.service';
import { CabinetComponent } from './cabinet/cabinet.component';
import { ButtonMenuComponent } from './cabinet/components/button-menu/button-menu.component';
import { CabinetGuard } from './cabinet/cabinet.guard';
import { InGuard } from './auth/in/in.guard';
import { UpGuard } from './auth/up/up.guard';
import { CabinetResolver } from './cabinet/cabinet.resolver';
import { ProjectListComponent } from './cabinet/projects/project-list/project-list.component';
import { ProjectService } from './services/cabinet/projects/project.service';
import { ProjectListService } from './services/cabinet/projects/project-list.service';
import { ProjectComponent } from './cabinet/projects/project/project.component';
import { CreatingProjectFormComponent } from './cabinet/projects/creating-project-form/creating-project-form.component';
import { CurrentDashboardComponent } from './cabinet/dashboard/current-dashboard/current-dashboard.component';
import { CurrentDashboardService } from './services/cabinet/dashboard/current-dashboard.service';
import { CurrentDashboardGuard } from './cabinet/dashboard/current-dashboard/current-dashboard.guard';
import { TaskListComponent } from './cabinet/dashboard/task-list/task-list.component';
import { TaskComponent } from './cabinet/dashboard/task/task.component';
import {TaskService} from './services/cabinet/dashboard/task.service';
import {CurrentDashboardResolver} from './cabinet/dashboard/current-dashboard/current-dashboard.resolver';
import {WebSocetService} from './services/cabinet/dashboard/websocet.service';
import { NgDragDropModule } from 'ng-drag-drop';
import { TaskRedactionComponent } from './cabinet/dashboard/task-redaction/task-redaction.component';
import { CommentComponent } from './cabinet/dashboard/comment/comment.component';
import { EventComponent } from './cabinet/dashboard/current-dashboard/event/event.component';
import { ShareComponent } from './cabinet/share/share.component';


@NgModule({
  declarations: [
    AppComponent,
    SignComponent,
    InComponent,
    UpComponent,
    CabinetComponent,
    UserComponent,
    ButtonMenuComponent,
    ProjectListComponent,
    ProjectComponent,
    CreatingProjectFormComponent,
    CurrentDashboardComponent,
    TaskListComponent,
    TaskComponent,
    TaskRedactionComponent,
    CommentComponent,
    EventComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    UserService,
    SignInService,
    ProjectService,
    ProjectListService,
    CabinetGuard,
    FormsModule,
    InGuard,
    UpGuard,
    CabinetResolver,
    CurrentDashboardService,
    CurrentDashboardGuard,
    CurrentDashboardResolver,
    TaskService,
    WebSocetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
