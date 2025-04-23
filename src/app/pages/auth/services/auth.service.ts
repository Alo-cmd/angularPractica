import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, interval, map, Observable, of, Subscription, throwError } from 'rxjs';
import { URL_SERVICIOS } from '../../../config/config';
import { UserModel } from '../../../user-model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';
  user?: UserModel | null;

  private refreshTokenInterval!: Subscription;

  currentUser$: Observable<UserModel>;
  currentUserSubject: BehaviorSubject<UserModel>;

  constructor(
    private http: HttpClient,
    // private toastr: ToastrService,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>({} as UserModel);
    this.currentUser$ = this.currentUserSubject.asObservable();
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      this.initAuth();
    }
  }

  startTokenRefresh(): void {
    this.refreshTokenInterval = interval(3600000).subscribe(() => {
      this.refreshToken();
    });
  }

  stopTokenRefresh(): void {
    if (this.refreshTokenInterval) {
      this.refreshTokenInterval.unsubscribe();
    }
  }

  /**
   * Refresh token user
   * @returns Observable<Object>
   */
  refreshToken(): Observable<Object> {
    let URL = URL_SERVICIOS + 'auth/refresh_token';
    return this.http.post(URL, {}).pipe(
      catchError((err) => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  /**
  * Check if the user has already been authenticated
  * @returns boolean
  */
  isAuthenticated(): boolean {
    return !!this.user;
  }

  isUserAuthenticated(): boolean {
    return this.currentUserSubject.value != null;
  }

  initAuth(): void {
    const tokenFromStorage = localStorage.getItem("token");
    const userFromStorage = localStorage.getItem("user");

    // if (tokenFromStorage && userFromStorage) {
    if (userFromStorage) {
      try {
        this.user = JSON.parse(userFromStorage);
        this.currentUserSubject.next(this.user!);
        // this.token = tokenFromStorage;
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
        // this.toastr.error('Ocurrio un error inesperado, por favor intentalo de nuevo o más tarde', 'Error');
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    let URL = URL_SERVICIOS + "auth/login";
    return this.http.post(URL, { email, password }).pipe(
      map((response: any) => {
        const result = this.saveLocalStorage(response);
        return result;
      }),
      catchError((error: any) => {
        return of(error);
      })
    );
  }

  saveLocalStorage(response: any): boolean {
    if (response && response.access_token) {
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      this.currentUserSubject.next(response.user);
      return true;
    }
    return false;
  }

  register(data: any) {
    let URL = URL_SERVICIOS + "auth/register";
    return this.http.post(URL, data);
  }

  logout(): void {
    if (this.token == null) {
      this.stopTokenRefresh();
      localStorage.removeItem('user');
      this.router.navigate(['/login'], {
        queryParams: {},
      });
      return;
    }

    // Define the URL for the logout endpoint
    const URL = `${URL_SERVICIOS}auth/logout`;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.token });
    setTimeout(() => {
      // Make the HTTP POST request for logout
      this.http.post(URL, {}, { headers: headers }).subscribe({
        next: (response: any) => {
          this.destroyTokenUser();
        },
        error: (error: HttpErrorResponse) => {
          this.destroyTokenUser();
        }
      });
    }, 500);

  }

  /**
  * Delete data of user as token
  * @returns void
  */
  private destroyTokenUser(): void {
    localStorage.removeItem('user');
    this.stopTokenRefresh();
    this.router.navigate(['/login'], {
      queryParams: {},
    });
    document.location.reload();
  }

}
