import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '/api/email';


  constructor(private http: HttpClient) {}

  // Método GET para obtener correos electrónicos
  getEmails(): Observable<string[]> {
    return this.http.get<string[]>('/api/v2/person/email');

  }
}
