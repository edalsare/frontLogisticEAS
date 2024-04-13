import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMuelle } from '../../models/muelle';
import { MuelleService } from '../../services/muelle.service';
import { error } from 'jquery';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-muelle',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './muelle.component.html',
  styleUrl: './muelle.component.css'
})
export class MuelleComponent {

  @Output() mensaje = new EventEmitter<string>();
  @Output() ban = new EventEmitter<boolean>();

  formMuelle: FormGroup
  private pier: IMuelle = {} as IMuelle;
  private _apiMuelle = inject(MuelleService);

  constructor(private form: FormBuilder){
    this.formMuelle = this.form.group({
      muelle: ['', Validators.required]
    })
  }

  enviar(){
    this.pier.nompier = this.formMuelle.get("muelle")?.value;

    this._apiMuelle.getByNameMuelle(this.pier.nompier).subscribe({
      next: data =>{
        if(data){
          this.mensaje.emit("Nombre de muelle ya existe");
          this.ban.emit(true);
        }else{
          this._apiMuelle.postMuelle(this.pier).subscribe({
            next: data =>{
              console.log(data.body);
              this.mensaje.emit(this.pier.nompier +" ingresado correctamente");
              this.ban.emit(false);
              this.formMuelle.reset();
            },
            error: err =>{
              console.error(err);
            }
          })
        }

      },
      error: err =>{

      }
    })
    
  }

}
