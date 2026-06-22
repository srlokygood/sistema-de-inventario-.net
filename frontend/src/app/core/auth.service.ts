import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/auth.models';
import { Login } from '../models/auth.models';
// Credenciales "quemadas" (hardcodeadas) solo para fines de demo.
// En un proyecto real esto NUNCA debe ir en el frontend: debe validarse
// contra un backend.
const SESSION_KEY = 'isLoggedIn';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Señal reactiva que indica si hay sesión activa.
  // Se inicializa leyendo sessionStorage para sobrevivir a un refresh (F5).
  private readonly loggedIn = signal<boolean>(
    sessionStorage.getItem(SESSION_KEY) === 'true'
  );

  // Exposición de solo lectura para los componentes.
  readonly isLoggedIn = this.loggedIn.asReadonly();

  /**
   * Intenta iniciar sesión comparando contra las credenciales quemadas en el backend.
   * Devuelve true si el login fue exitoso, false en caso contrario.
   */
  private readonly apiUrl = 'http://localhost:5000/auth/login';
  login(username: string, password: string): Observable<Token> {
    const body: Login = { username, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<Token>(this.apiUrl, body, { headers });
  }

  logout(): void {
    this.loggedIn.set(false);
    sessionStorage.removeItem(SESSION_KEY);
  }

}
