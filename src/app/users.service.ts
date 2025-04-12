import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from './config/config';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(URL_SERVICIOS + 'users');
  }

  getUserById(userId: number): Observable<UserModel> {
    return this.http.get<UserModel>(URL_SERVICIOS + 'users/' + userId);
  }

  createNewUser(data: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(URL_SERVICIOS + 'users', data);
  }

  updateUserById(userId: number, data: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(URL_SERVICIOS + 'users' + userId, data);
  }

  deleteUserById(userId: number): Observable<Object> {
    return this.http.delete(URL_SERVICIOS + 'users/' + userId);
  }

}
