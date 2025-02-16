import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmComponent } from '../../components/modal-confirm/modal-confirm.component';
import { EngineersService } from '../../services/engineers.service';

@Component({
  selector: 'app-engineers',
  templateUrl: './engineers.component.html',
  styleUrls: ['./engineers.component.css']
})
export class EngineersComponent implements OnInit {
  tasks: any[] = [];
  formGroup!: FormGroup;
  selectedTask: any; // ID da tarefa selecionada para exclusão
  isToastVisible = false;
  toastMessage = '';
  toastTimeout: any; // Variável para armazenar o ID do setTimeout
  loading = false;
  isEditing = false;
  errorMessage = '';


  
    constructor(private engineersService: EngineersService, private fb: FormBuilder, private dialog: MatDialog) {}
  
    ngOnInit(): void {
  
      this.formGroup = this.fb.group({
        id: [null],
        name: [''],
        max_workload: [null],
        efficiency: ['']
      }) 
  
      this.loadTasks();
    }
  
    loadTasks() {
      this.engineersService.getEngineers().subscribe((data: any) => {
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

      let message = `Tem certeza que deseja excluir este engenheiro ? ${taskId.name}`;
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
        this.engineersService.updateEngineer(this.formGroup.value.id, this.formGroup.value).subscribe(() => {
          this.loadTasks();
          this.formGroup.reset();
          this.showToast("Engenheiro adicionado com sucesso!."); 
          this.isEditing = false;
        });
      } else {
        this.engineersService.createEngineer(this.formGroup.value).subscribe(() => {
          this.loadTasks();
          this.formGroup.reset();
        });
      }
    }
  
    updateTask(task: any) {
      this.isEditing = true;
      this.formGroup.patchValue({
        id: task.id,
        name: task.name,
        max_workload: task.max_workload,
        efficiency: task.efficiency
      });
    }

    // Exclui a tarefa após confirmação
    deleteTask(taskId: any) {
      this.loading = true;
      if (taskId !== null) {
        this.engineersService.deleteEngineer(taskId).subscribe(() => {
          this.loadTasks(); // Atualiza a lista de tarefas
          this.loading = false;
          this.showToast("Engenheiro deletado com sucesso!."); 
          this.errorMessage = '';
        }, () => {
          this.errorMessage = "Este engenheiro não pode ser excluido, pois tem tarefas associadas.";
        });
      }
    }
}