import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Assignments
  allocateTasks(): Observable<any> {
    return this.http.post(`${this.baseUrl}/assignments/allocate`, {});
  }

  startTask(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/assignments/start/${id}`, {});
  }

  completeTask(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/assignments/complete/${id}`, {});
  }

  getReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/assignments/report`);
  }
}