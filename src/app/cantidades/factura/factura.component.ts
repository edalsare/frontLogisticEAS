import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { IProducto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { AlertFailComponent } from '../../alerts/alert-fail/alert-fail.component';
import { IFactura } from '../../models/factura';
import { ICantidadIn } from '../../models/cantidad-in';
import { IUsers } from '../../models/users.model';
import { UsuarioService } from '../../services/usuario.service';
import { FacturaService } from '../../services/factura.service';
import { AlertOkComponent } from '../../alerts/alert-ok/alert-ok.component';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuComponent,
    CommonModule,
    FormsModule,
    AlertFailComponent,
    AlertOkComponent,
  ],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css',
})
export class FacturaComponent {
  formFactura: FormGroup;
  producto: IProducto = {} as IProducto;
  products: any[][] = [];
  banBtn: boolean = true;
  dataTable: Array<any> = [];
  banFail: boolean = false;
  banOk: boolean = false;
  banFac: boolean = true;
  mensaje: string = '';
  cantidad: number = 0;
  index: number = 0;
  factura: IFactura = {} as IFactura;
  usuario: IUsers = {} as IUsers;

  _serviceProduct = inject(ProductoService);
  _serviceUser = inject(UsuarioService);
  _serviceFactura = inject(FacturaService);

  constructor(private form: FormBuilder) {
    this.formFactura = this.form.group({
      numerof: ['', Validators.required],
      agencia: ['', Validators.required],
      ean: [''],
      detalle: [''],
      cantidad: [''],
    });
    this.formFactura.get('detalle')?.disable();
    this.formFactura.get('cantidad')?.disable();
  }

  onEnter() {
    const ean: number = this.formFactura.get('ean')?.value;
    this._serviceProduct.getProductoByID(ean).subscribe({
      next: (data) => {
        this.formFactura.get('cantidad')?.enable();
        this.banBtn = false;
        this.producto = data;
        this.formFactura
          .get('detalle')
          ?.setValue(
            data.nameproduct + ', ' + data.descriptionpro + ', ' + data.suplier
          );
      },
      error: (err) => {
        alert('Producto no encontrado');
        this.formFactura.get('detalle')?.setValue('');
        this.banBtn = true;
        this.formFactura.get('cantidad')?.disable();
      },
    });
  }

  OnTabla() {
    this.banFail = false;
    this.banOk = false;
    let aux: boolean = false;
    for (const item of this.products) {
      if (item[0].idproduct == this.producto.idproduct) {
        alert('Este producto ya se agrego a la factura actual');
        aux = true;
      }
    }
    if (!aux) {
      if (
        this.formFactura.get('cantidad')?.value == '' ||
        this.formFactura.get('cantidad')?.value <= 0
      ) {
        this.mensaje = 'Debe ingresar una cantidad correcta';
        this.banFail = true;
      } else {
        this.banFac = false;
        this.banFail = false;
        const can: ICantidadIn = {} as ICantidadIn;
        can.cantin = this.formFactura.get('cantidad')?.value;
        this.products.push([this.producto, can]);
        this.banBtn = true;
        this.formFactura.get('cantidad')?.disable();
        this.formFactura.get('cantidad')?.setValue('');
        this.formFactura.get('ean')?.setValue('');
        this.formFactura.get('detalle')?.setValue('');
      }
    } else {
      this.formFactura.get('ean')?.setValue('');
      this.formFactura.get('detalle')?.setValue('');
      this.formFactura.get('cantidad')?.disable();
      this.formFactura.get('cantidad')?.setValue('');
      this.banBtn = true;
    }
  }

  deleteProduct(id: number) {
    this.products.splice(id, 1);
    if (this.products.length == 0) {
      this.banFac = true;
    }
  }

  envioIndex(index: number) {
    this.index = index;
  }

  limpiarModal() {
    this.cantidad = 0;
  }

  nuevaCantidad() {
    if (this.cantidad <= 0) {
      this.banFail = true;
      this.cantidad = 0;
      this.mensaje = 'Al modficar la cantidad debe ser mayor a cero';
    } else {
      this.banFail = false;
      this.products[this.index][1].cantin = this.cantidad;
      this.cantidad = 0;
    }
  }

  enviar() {
    this.usuario = this._serviceUser.getUsario();
    this._serviceFactura
      .existsByNumbill(this.formFactura.get('numerof')?.value)
      .subscribe({
        next: (data) => {
          if (data) {
            this.mensaje = 'Numero de factura ya se encuentra registrada';
            this.banFail = true;
          } else {
            this.banFail = false;
            this.factura.numbill = this.formFactura.get('numerof')?.value;
            this.factura.lagency = this.formFactura.get('agencia')?.value;
            this._serviceFactura
              .postFactura(this.products, this.factura, this.usuario)
              .subscribe({
                next: (data) => {
                  this.mensaje = '' + data.body;
                  this.banOk = true;
                  this.limpiarFormulario();
                },
                error: (err) => {
                  this.mensaje = 'Algo salio mal, intenteo nuevamente';
                  this.banFail = true;
                },
              });
          }
        },
      });
  }

  limpiarFormulario() {
    this.formFactura.reset();
    this.products = [];
  }
}
