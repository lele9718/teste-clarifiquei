import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { EngineersComponent } from './pages/engineers/engineers.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ToastMessageComponent } from './components/toast-message/toast-message.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    EngineersComponent,
    TasksComponent,
    AssignmentsComponent,
    ToastMessageComponent,
    ModalConfirmComponent,
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(), provideAnimationsAsync()], // add it here
  bootstrap: [AppComponent]
})
export class AppModule { }
