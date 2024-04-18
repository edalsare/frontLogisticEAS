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
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { IUsers } from '../../models/users.model';

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
  product: IProducto[] = [];
  categoriat: ICategory = {} as ICategory;
  usuario: IUsers ={} as IUsers;
  idUser: number = 0;
  private _sercCategoria = inject(CategoriaService);
  private _productoService = inject(ProductoService);
  private _usuarioService = inject(UsuarioService);
  
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
    
    const producto: IProducto= {} as IProducto;
    
  const category: ICategory = {} as ICategory;
    producto.idproduct = this.formProducto.get('ean')?.value ;
    producto.nameproduct = this.formProducto.get('nombre_pro')?.value ;
    producto.suplier = this.formProducto.get('proveedor')?.value ;
    producto.descriptionpro = this.formProducto.get('descripcion')?.value ;
    category.namecat = this.formProducto.get('categoría')?.value ;
    category.subnamecat = this.formProducto.get('subcategoria')?.value ;
    producto.category = category;

    this._productoService.getProductExist(this.formProducto.get('ean')?.value).subscribe({
      next: data =>{
        if(data == true){
          this.banFail = true;
          this.mensaje = "Este producto ya se encuentra Registrado, prueba otro EAN"
        }else{
          this.banFail = false;
          this.mensaje = ""
          for(let pro of this.product){
            if(pro.idproduct == producto.idproduct){
               this.banFail = true;
               this.mensaje = "Este producto ya se encuentra en la lista a registrar"
            }
          }

          if(this.banFail == false){
            this.product.push(producto);
            this.formProducto.reset();
          }
          
        }
      },
      error: err =>{
        console.error(err);
      }
    })

    
  }

  registrar(){
    
    this.usuario = this._usuarioService.getUsario();
    this.idUser = this.usuario.id_users;
    this._productoService.postProducto(this.idUser, this.product).subscribe({
      next: (data) =>{
        console.log(data.body);
        this.product = [];
      }, error: (err) =>{
        console.error(err);
      }
    })
  }

  deleteProduct(index: number) {
    this.product.splice(index, 1);
  }

}
