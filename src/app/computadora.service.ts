import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComputadoraModel } from './computadora-model';

@Injectable({
  providedIn: 'root'
})
export class ComputadoraService {

  private URL = 'http://localhost:8000/api/computadora';

  constructor(private http: HttpClient) { }

  getComputadoras(): Observable<ComputadoraModel[]> {
    return this.http.get<ComputadoraModel[]>(this.URL);
  }

  createComputadora(data: ComputadoraModel): Observable<ComputadoraModel> {
    return this.http.post<ComputadoraModel>(this.URL, data);
  }

  deleteComputadora(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }
}
