import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProporcion } from '../../../models/proporcion';
import { CommonModule } from '@angular/common';
import { AlertFailComponent } from '../../../alerts/alert-fail/alert-fail.component';
import { AlertOkComponent } from '../../../alerts/alert-ok/alert-ok.component';

@Component({
  selector: 'app-proporciones',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    AlertFailComponent,
    AlertOkComponent
  ],
  templateUrl: './proporciones.component.html',
  styleUrl: './proporciones.component.css'
})
export class ProporcionesComponent implements OnInit, OnChanges{

  formProporcion: FormGroup;
  proporcions: IProporcion = {} as IProporcion;
  @Input() huella: string = '';
  @Output() proporcion = new EventEmitter<IProporcion>;
  banFail: boolean = false;
  banOk: boolean = false;
  mensaje: string = '';

  constructor(private form: FormBuilder){
    this.formProporcion = this.form.group({
      alto: ['',[Validators.required, Validators.min(1)]],
      ancho: ['',[Validators.required, Validators.min(1)]],
      largo: ['',[Validators.required, Validators.min(1)]],
      plancha: ['',[Validators.required, Validators.min(1)]],
      pallet: ['',[Validators.required, Validators.min(1)]]
    })

    this.formProporcion.valueChanges.subscribe(valores =>{
      if(this.formProporcion.valid){
        this.banFail = false;
        this.proporcions.hight = this.formProporcion.get('alto')?.value;
        this.proporcions.width = this.formProporcion.get('ancho')?.value;
        this.proporcions.lengthy = this.formProporcion.get('largo')?.value;
        this.proporcions.planch = this.formProporcion.get('plancha')?.value;
        this.proporcions.numplanch = this.formProporcion.get('pallet')?.value;

        this.proporcion.emit(this.proporcions);
        this.mensaje = 'Los datos ingresados son correctos'
        this.banOk = true;
      }else{
        if(this.huella === ''){
          this.banOk = false;
          this.banFail = false;
        }else{
          this.banOk = false;          
          this.proporcions = {} as IProporcion;
          this.proporcion.emit(this.proporcions);
          this.mensaje = 'Todos los campos deben estart completos, asegurate de diligenciar de acuerdo al tipo de huella a registrar'
          this.banFail = true;
        }
        
      }
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['huella'].currentValue == 'Nivel1'){
      this.formProporcion.reset();
      this.formProporcion.enable()
      this.formProporcion.get('plancha')?.setValue(1);
      this.formProporcion.get('plancha')?.disable();
      this.formProporcion.get('pallet')?.setValue(1);
      this.formProporcion.get('pallet')?.disable();
    }else{ 
      
      this.formProporcion.get('pallet')?.setValidators([Validators.min(2), Validators.required]);
      this.formProporcion.get('plancha')?.setValidators([Validators.min(2), Validators.required]);
      this.formProporcion.reset();
      this.formProporcion.enable();
      if(this.huella == ''){
        this.formProporcion.disable();
      }
    }
  }
  ngOnInit(): void {
    this.formProporcion.disable();
  }

}
