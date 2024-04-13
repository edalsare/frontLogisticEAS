import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../models/categoria';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  formCategoria: FormGroup;
  private category: ICategory = {} as ICategory;
  private _apiCategoria = inject(CategoriaService);
  

  @Output() mensaje = new EventEmitter<string>();
  @Output() ban = new EventEmitter<boolean>();

  constructor(private form: FormBuilder){
    this.formCategoria = this.form.group({
      categoria: ['', Validators.required],
      subCategoria: ['', Validators.required]

    })
  }

  enviar(){
    this.category.namecat = this.formCategoria.get('categoria')?.value;
    this.category.subnamecat = this.formCategoria.get('subCategoria')?.value;
    this._apiCategoria.getNameAndSubName(
      this.category.namecat, this.category.subnamecat).subscribe({
        next: data =>{
          if(data){
            this.mensaje.emit("Combinación categoría y Subcategoría ya se encuentra registrado");
            this.ban.emit(true);
            
          }else{
            
              this._apiCategoria.postCategoria(this.category).subscribe({
              next: data =>{
                console.log(data.body)
                this.mensaje.emit("Categoría: "+this.category.namecat+" y Subcategoría: "+this.category.subnamecat+" ingresado correctamente");
                this.ban.emit(false);
                this.formCategoria.reset();
              },
              error: err =>{
                console.error(err);
              }
            })
          }
          
        },
        error: err =>{
          console.error(err);
        }
      })

    
  }
}
