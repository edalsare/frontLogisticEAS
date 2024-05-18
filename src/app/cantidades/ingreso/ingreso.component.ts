import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { IProducto } from '../../models/producto';
import { IFactura } from '../../models/factura';
import { FacturaService } from '../../services/factura.service';
import { CantidadInService } from '../../services/cantidad-in.service';
import { ICantidadIn, Icantidades } from '../../models/cantidad-in';
import { CantidadInComponent } from './cantidad-in/cantidad-in.component';

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MenuComponent,
    CantidadInComponent
  ],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css'
})
export class IngresoComponent implements OnInit{
  formIngreso: FormGroup;
  cantidadIn: ICantidadIn[] = [];
  agencia: string[] = [] 
  numFac: string[] = [];
  productos: IProducto[] = [];
  index: number = 0;
  cantidades: Icantidades[] = [];
  recepCantidades: Icantidades = {} as Icantidades;
  cantidadesout: Icantidades = {} as Icantidades;

  _serviceFactura = inject(FacturaService);
  _serviceCantidadIn = inject(CantidadInService);

  constructor(private form: FormBuilder){
    this.formIngreso = this.form.group({
      agencya: ['', Validators.required],
      numbill: ['', Validators.required]
    })

  }
  ngOnInit(): void {
    this._serviceFactura.readAllBill().subscribe({
      next: data =>{
        this.agencia = data;
      }
    })    
  }

  onFactura(){
    this._serviceFactura.readAgencia(this.formIngreso.get('angencia')?.value).subscribe({
      next: data =>{
        this.numFac = data;
      }
    })
  }

  onProducto(){
    this._serviceFactura.readByAgencia(this.formIngreso.get('numbill')?.value).subscribe({
      next: data =>{
        this.productos = data.product;
        this._serviceCantidadIn.readByNumbill(data.idbill).subscribe({
          next: data =>{
           this.cantidadIn = data;
            for(let dat of data){
              const cantidad: Icantidades = {} as Icantidades;
              cantidad.Icantidad = dat;
              cantidad.cantidadf = 0;
              this.cantidades.push(cantidad);
            }
          }
        })
      },error: err =>{
        console.error(err);
      }
    })
  }

  recibirCantidades(cantidades: Icantidades){
    const can: Icantidades = cantidades;
    this.cantidades[this.index].cajas = cantidades.cajas
    this.cantidades[this.index].cantidadf = cantidades.cantidadf
    this.cantidades[this.index].pallets = cantidades.pallets
    this.cantidades[this.index].unidades = cantidades.unidades
  }

  ingresarCantidades(index: number){
    this.index = index;
    this.cantidadesout = this.cantidades[this.index]
  }

}
