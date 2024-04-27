import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPackage } from '../../../models/package';
import { AlertFailComponent } from '../../../alerts/alert-fail/alert-fail.component';
import { CommonModule } from '@angular/common';
import { AlertOkComponent } from '../../../alerts/alert-ok/alert-ok.component';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [ReactiveFormsModule,
    AlertFailComponent,
    CommonModule,
    AlertOkComponent
  ],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnChanges, OnInit {
  formPackage: FormGroup;
  banFail: boolean = false;
  banOk: boolean = false;
  mensaje: string ='';
  package: IPackage = {} as IPackage;

  @Input() huella: string ='';  
  @Output() packages = new EventEmitter<IPackage>;

  constructor(private form: FormBuilder){
    this.formPackage = this.form.group({
      unidad: ['', [Validators.required, Validators.min(1)]],
      blister: ['', [Validators.required, Validators.min(1)]],
      caja: ['', [Validators.required, Validators.min(1)]],
      pallet: ['', [Validators.required, Validators.min(1)]],
      pieza: ['', [Validators.required, Validators.min(1)]]
    })

    this.formPackage.valueChanges.subscribe(valores => {
      
      if(this.formPackage.valid){
        this.banFail = false;
        this.package.unit = this.formPackage.get('unidad')?.value;
        this.package.box = this.formPackage.get('caja')?.value;
        this.package.pallet = this.formPackage.get('pallet')?.value;
        this.package.piece = this.formPackage.get('pieza')?.value;
        this.package.blister = this.formPackage.get('blister')?.value;

        this.packages.emit(this.package);
        this.banOk = true;
        this.mensaje = 'Los datos ingresados son correctos'
      }else{
        if(this.huella === '' || this.huella === 'Nivel1'){
          this.banFail = false;
          this.banOk = false;
        }else{
          this.banFail = true;
          this.banOk = false;
          this.mensaje = 'Todos los campos deben estart completos, asegurate de diligenciar de acuerdo al tipo de huella a registrar'
          this.package = {} as IPackage;
          this.packages.emit(this.package);
        }
        
        }
    });
  }
  
  ngOnInit(): void {
    this.formPackage.disable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['huella'].currentValue == 'Nivel1'){
      this.formPackage.disable();
      this.formPackage.get('unidad')?.setValue(1);
      this.formPackage.get('blister')?.setValue(1);
      this.formPackage.get('caja')?.setValue(1);
      this.formPackage.get('pallet')?.setValue(1);
      this.formPackage.get('pieza')?.setValue(1);

      this.package.unit = 1;
      this.package.piece = 1;
      this.package.pallet = 1;
      this.package.box = 1;
      this.package.blister = 1;

      this.packages.emit(this.package);

    }else if(changes?.['huella'].currentValue == 'Nivel2'){

      this.formPackage.enable(); 
      this.formPackage.reset(); 
      this.formPackage.get('blister')?.setValue(1);
      this.formPackage.get('blister')?.disable();
      this.formPackage.get('caja')?.setValue(1);
      this.formPackage.get('caja')?.disable();
      this.formPackage.get('pallet')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('pieza')?.setValidators([Validators.min(1), Validators.required]);
    }
    else if(changes?.['huella'].currentValue == 'Nivel3'){

      this.formPackage.enable();
      this.formPackage.reset();
      this.formPackage.get('blister')?.setValue(1);
      this.formPackage.get('blister')?.disable();
      this.formPackage.get('caja')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('pallet')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('pieza')?.setValidators([Validators.min(1), Validators.required]);

    }else if(changes?.['huella'].currentValue == 'Nivel4'){

      this.formPackage.enable();
      this.formPackage.reset();
      this.formPackage.get('blister')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('caja')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('pallet')?.setValidators([Validators.min(2), Validators.required]);      
      this.formPackage.get('pieza')?.setValidators([Validators.min(1), Validators.required]);
      this.formPackage.get('pieza')?.setValue(1);
      this.formPackage.get('pieza')?.disable();

    }else if(changes?.['huella'].currentValue == 'Nivel5'){

      this.formPackage.enable();
      this.formPackage.reset();
      this.formPackage.get('blister')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('caja')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('pallet')?.setValidators([Validators.min(2), Validators.required]);
      this.formPackage.get('pieza')?.setValidators([Validators.min(2), Validators.required]);
    }else{
      this.formPackage.reset();
      this.formPackage.disable();
    }
  }
}
