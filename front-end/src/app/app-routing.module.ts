import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { EngineersComponent } from './pages/engineers/engineers.component';

const routes: Routes = [
  { path: 'engineers', component: EngineersComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}