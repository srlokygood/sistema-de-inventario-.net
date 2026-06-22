import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username ?? '', password ?? '').subscribe({
      next: (response) => {
        console.log(response);
        if (response.status) {
          sessionStorage.setItem("isLoggedIn",'true'); 
          console.log("redireccionando");
          this.errorMessage = '';
          
          // Probablemente quieras guardar el token aquí
          localStorage.setItem('token', response.token.toString());
          this.router.navigate(['/productos']);
          
        } else {
          console.log(response.status);
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      },
      error: (err) => {
        console.error('Error en login', err);
        this.errorMessage = 'Error al conectar con el servidor';
      }
    });
  }
}