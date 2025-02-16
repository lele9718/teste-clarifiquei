import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EngineersService {
  
  private baseUrl = environment.apiUrl; 

  constructor(private http: HttpClient) {}

  // Engineers
  getEngineers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/engineers`);
  }

  createEngineer(engineer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/engineers`, engineer);
  }

  updateEngineer(id: number, engineer: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/engineers/${id}`, engineer);
  }

  deleteEngineer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/engineers/${id}`);
  }
}