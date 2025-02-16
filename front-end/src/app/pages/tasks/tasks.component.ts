import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  formGroup!: FormGroup;
  newTask = { id: null, name: '', priority: '', time_required: null };
  editTask = { id: null, name: '', priority: '', time_required: null };
  selectedTask: any; // ID da tarefa selecionada para exclusão
  loading = false;
  isEditing = false;
  isToastVisible = false;
  toastMessage = '';
  toastTimeout: any; // Variável para armazenar o ID do setTimeout

  constructor(private taskService: TasksService, private fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.formGroup = this.fb.group({
      id: [null],
      name: [''],
      priority: [null],
      time_required: ['']
    }) 

    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  showToast(message: string, toastColor?: string) {
    // Se houver um setTimeout ativo, limpa ele
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    // Sempre ativa o toast ao chamar a função
    this.isToastVisible = true;
    this.toastMessage = message;

    // Define um novo timeout para esconder o toast após 3 segundos
    this.toastTimeout = setTimeout(() => {
      this.isToastVisible = false;
    }, 3000); // 3000ms = 3 segundos
  }

  openModal(taskId: any) {

    let message = `Tem certeza que deseja excluir esta tarefa ? ${taskId.name}`;
    let title = `Confirmar exclusão`;

    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title,
        message
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.confirmed) {
        this.deleteTask(taskId.id);
      } else {
        console.log('Ação cancelada');
      }
    });
  }

  addOrUpdateTask() {

    if (this.formGroup.value.id) {
      this.taskService.updateTask(this.formGroup.value.id, this.formGroup.value).subscribe(() => {
        this.loadTasks();
        this.formGroup.reset();
        this.showToast("Tarefa editada com sucesso!"); 
        this.isEditing = false;
      });
    } else {
      this.taskService.createTask(this.formGroup.value).subscribe(() => {
        this.loadTasks();
        this.showToast("Tarefa cadastrada com sucesso!"); 
        this.formGroup.reset();
      });
    }
  }

  updateTask(task: any) {
    this.isEditing = true;
    this.formGroup.patchValue({
      id: task.id,
      name: task.name,
      priority: task.priority,
      time_required: task.time_required
    });
  }

  // Exclui a tarefa após confirmação
  deleteTask(taskId: any) {
    this.loading = true;
    if (taskId !== null) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        this.showToast("Tarefa deletada com sucesso!"); 
        this.loadTasks(); // Atualiza a lista de tarefas
        this.loading = false;
      });
    }
  }
}