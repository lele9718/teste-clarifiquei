import { Component, Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssignmentsService } from '../../services/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.sass']
})
export class AssignmentsComponent implements OnInit {
  assignments: any[] = [];
  isToastVisible = false;
  toastMessage = '';
  errorMessage = '';
  colorToast: any;
  toastTimeout: any; // Variável para armazenar o ID do setTimeout]

  //chart
  
    //chart
    multi: any[] = []
    view: number[] = [700, 400];
  
    // options
    showXAxis: boolean = true;
    showYAxis: boolean = true;
    gradient: boolean = false;
    showLegend: boolean = false;
    legendPosition: string = 'below';
    showXAxisLabel: boolean = true;
    yAxisLabel: string = 'Engenheiros';
    showYAxisLabel: boolean = true;
    xAxisLabel = 'Horas';
    schemeType: string = 'linear';

  constructor(private assignmentsService: AssignmentsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadReport();
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
    }, 9000); // 3000ms = 3 segundos
  }

  allocateTasks() {
    this.assignmentsService.allocateTasks().subscribe(() => {
      this.loadReport();
      this.showToast("Tarefas alocadas com sucesso !");
      this.errorMessage = '';
    }, (error) => {
      this.loadReport();
      this.errorMessage = error.error.message;
    });
  }

  startTask(id: number) {
    this.assignmentsService.startTask(id).subscribe(() => {
      this.loadReport();
    });
  }

  completeTask(id: number) {
    this.assignmentsService.completeTask(id).subscribe(() => {
      this.loadReport();
    });
  }

  loadReport() {
    this.assignmentsService.getReport().subscribe((data: any) => {
      this.assignments = data;
      this.assignments.forEach(dados => {
        this.multi.push({
          "name": dados.engineer_name,
          "series": [
            {
              "name": dados.task_name,
              "value": dados.adjusted_time,
            }
          ]
        })
      })
      this.multi = [...this.multi];
    });
  }
}