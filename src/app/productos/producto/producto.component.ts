import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { AlertFailComponent } from '../../alerts/alert-fail/alert-fail.component';
import { AlertOkComponent } from '../../alerts/alert-ok/alert-ok.component';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { IProducto } from '../../models/producto';
import { ICategory } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MenuComponent,
    AlertFailComponent,
    AlertOkComponent, 
    CommonModule,
    MatTableModule
    ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{

  mensaje: string = ""
  banOk: boolean = true;
  banFail: boolean = false;
  formProducto: FormGroup;
  cat?: string[];
  categoria?: ICategory[];
  producto: IProducto= {} as IProducto;
  tableproductos: IProducto[] = [];
  categoriat: ICategory = {} as ICategory;
  categoriaTable: ICategory = {} as ICategory;
  private _sercCategoria = inject(CategoriaService);
  
  productos: IProducto[] = [];

  constructor(private form: FormBuilder){
    this.formProducto = this.form.group({
      ean: ['', Validators.required],
      nombre_pro: ['', Validators.required],
      proveedor: ['', Validators.required],
      categoría: ['', Validators.required],
      subcategoria: ['', Validators.required],
      descripcion: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this._sercCategoria.getAllCategorias().subscribe({
      next: data =>{
        this.cat = data;
      }, 
      error: err =>{
        console.log(err)
      }
    })
  }

  onSelect(){
    this._sercCategoria.getBynamecat(this.formProducto.get('categoría')?.value).subscribe({
      next: data =>{
        this.categoria = data;
      }
    })
  }

  enviar(){
    this.producto.id_product = this.formProducto.get('ean')?.value ;
    this.producto.name_product = this.formProducto.get('nombre_pro')?.value ;
    this.producto.suplier = this.formProducto.get('proveedor')?.value ;
    this.producto.description_pro = this.formProducto.get('descripcion')?.value ;
    this.categoriaTable.namecat = this.formProducto.get('categoría')?.value ;
    this.categoriaTable.subnamecat = this.formProducto.get('subcategoria')?.value ;
    this.producto.category = this.categoriaTable;

    this.tableproductos.push(this.producto);
    this.formProducto.reset();
  }

  registrar(){
    console.log("Aqui va codigo para registrar producto");
  }

}
