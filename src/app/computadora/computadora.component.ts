import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComputadoraService } from '../computadora.service'; // Ruta para el service
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-computadora',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './computadora.component.html',
})
export class ComputadoraComponent {
  fb = inject(FormBuilder);
  computadoraService = inject(ComputadoraService);

  computadoraForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
  });

  computadoras: any[] = [];

  constructor() {
    this.getComputadoras();
  }

  getComputadoras() {
    this.computadoraService.getComputadoras().subscribe((data) => {
      this.computadoras = data;
    });
  }

  createComputadora() {
    if (this.computadoraForm.valid) {
      const nueva = this.computadoraForm.value;

      this.computadoraService.createComputadora(nueva).subscribe(() => {
        this.computadoraForm.reset(); // Limpia el formulario
        this.getComputadoras(); // Refresca la lista
      });
    }
  }

  deleteComputadora(id: number) {
    this.computadoraService.deleteComputadora(id).subscribe(() => {
      this.getComputadoras();
    });
  }
}
