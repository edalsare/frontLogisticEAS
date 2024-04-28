import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { IProducto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [ReactiveFormsModule, MenuComponent, CommonModule],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css',
})
export class FacturaComponent {
  formFactura: FormGroup;
  producto: IProducto = {} as IProducto;
  products: IProducto[] = [];
  banBtn: boolean = true;

  _serviceProduct = inject(ProductoService);

  constructor(private form: FormBuilder) {
    this.formFactura = this.form.group({
      numerof: [''],
      agencia: [''],
      ean: [''],
      detalle: [''],
    });
    this.formFactura.get('detalle')?.disable();
  }

  onEnter() {
    const ean: number = this.formFactura.get('ean')?.value;
    this._serviceProduct.getProductoByID(ean).subscribe({
      next: (data) => {
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
      },
    });
  }

  OnTabla(){
    let aux: boolean = false;
    for(const item of this.products){      
      if(item.idproduct == this.producto.idproduct){
        alert('Este producto ya se agrego a la factura actual')
        aux = true;
      }
    }
    if(!aux){
      this.products.push(this.producto);
      this.banBtn = true;
      this.formFactura.get('ean')?.setValue('');
      this.formFactura.get('detalle')?.setValue('');
    }else{
      this.formFactura.get('ean')?.setValue('');
      this.formFactura.get('detalle')?.setValue('');
      this.banBtn = true;
    }
    
  }

  deleteProduct(id: number){
    this.products.splice(id, 1);
  }
}
