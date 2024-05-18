import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Icantidades } from '../../../models/cantidad-in';

@Component({
  selector: 'app-cantidad-in',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './cantidad-in.component.html',
  styleUrl: './cantidad-in.component.css'
})
export class CantidadInComponent implements OnChanges{

  formCantidadIn: FormGroup;
  cantidades: Icantidades = {} as Icantidades;

  @Output() EnviarCantidades = new EventEmitter<Icantidades>();
  @Input() recibirCantidades: Icantidades = {} as Icantidades;

  constructor(private form: FormBuilder){
    this.formCantidadIn = this.form.group({
      unidades: ['', [Validators.required, Validators.min(0)]],
      cajas: ['', [Validators.required, Validators.min(0)]],
      pallets: ['', [Validators.required, Validators.min(0)]]
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formCantidadIn.get("cajas")?.setValue(changes?.['recibirCantidades'].currentValue.cajas)
    this.formCantidadIn.get("pallets")?.setValue(changes?.['recibirCantidades'].currentValue.pallets)
    this.formCantidadIn.get("unidades")?.setValue(changes?.['recibirCantidades'].currentValue.unidades)
  }

  enviar(){
    this.cantidades.unidades = this.formCantidadIn.get("unidades")?.value;
    this.cantidades.cajas = this.formCantidadIn.get("cajas")?.value;
    this.cantidades.pallets = this.formCantidadIn.get("pallets")?.value;
    this.cantidades.cantidadf = 0;
    this.EnviarCantidades.emit(this.cantidades);
  }

}
