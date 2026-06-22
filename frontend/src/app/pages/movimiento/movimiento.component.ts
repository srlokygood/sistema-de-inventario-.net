import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/product.service';

@Component({
  selector: 'app-movimiento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './movimiento.component.html',
  styleUrl: './movimiento.component.css'
})
export class MovimientoComponent {
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);

  formMovement = this.fb.group({
    idProducto: ['', Validators.required],
    tipoMovimiento: ['', Validators.required],
    cantidad: ['', [Validators.required, Validators.min(1)]]
  });


  onSubmit() {
    if (this.formMovement.valid) {
      console.log(this.formMovement.value);
      this.guardar.emit();
      this.productService.SaveMovement(this.formMovement.value)
      .subscribe({
        next: (response) => {
          console.log('Movimiento guardado', response);
        },
        error: (err) => {
          console.error('Error al guardar', err);
        }
      });
      
      this.formMovement.reset();
    } else {
      this.formMovement.markAllAsTouched();
    }
  }

  onCerrar() {
    this.formMovement.reset();
    this.cerrar.emit();
  }
}
