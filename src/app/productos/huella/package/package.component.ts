import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent implements OnChanges, OnInit {
  formPackage: FormGroup;

  @Input() huella: string ='';

  constructor(private form: FormBuilder){
    this.formPackage = this.form.group({
      unidad: ['', [Validators.required, Validators.min(1)]],
      blister: ['', [Validators.required, Validators.min(1)]],
      caja: ['', [Validators.required, Validators.min(1)]],
      pallet: ['', [Validators.required, Validators.min(1)]],
      pieza: ['', [Validators.required, Validators.min(1)]]
    })
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
      this.formPackage.get('pieza')?.enable();
    }else if(changes?.['huella'].currentValue == 'Nivel2'){
      this.formPackage.disable();
      this.formPackage.get('unidad')?.setValue(1);
      this.formPackage.get('unidad')?.enable();
      this.formPackage.get('blister')?.setValue(1);
      this.formPackage.get('caja')?.setValue(1);
      this.formPackage.get('pallet')?.setValue(2);
      this.formPackage.get('pallet')?.enable();
      this.formPackage.get('pallet')?.setValidators(Validators.min(2));
      this.formPackage.get('pallet')?.updateValueAndValidity();
      this.formPackage.get('pieza')?.setValue(1);
      this.formPackage.get('pieza')?.enable();
      console.log(this.formPackage.valid)
    }
    else if(changes?.['huella'].currentValue == 'Nivel3'){
      this.formPackage.disable();
      this.formPackage.get('unidad')?.setValue(1);
      this.formPackage.get('unidad')?.enable();
      this.formPackage.get('blister')?.setValue(1);
      this.formPackage.get('caja')?.setValue(2);
      this.formPackage.get('caja')?.enable();
      this.formPackage.get('caja')?.setValidators(Validators.min(2));
      this.formPackage.get('caja')?.updateValueAndValidity();
      this.formPackage.get('pallet')?.setValue(2);
      this.formPackage.get('pallet')?.enable();
      this.formPackage.get('pallet')?.setValidators(Validators.min(2));
      this.formPackage.get('pallet')?.updateValueAndValidity();
      this.formPackage.get('pieza')?.setValue(1);
      this.formPackage.get('pieza')?.enable();
    }else if(changes?.['huella'].currentValue == 'Nivel4'){
      this.formPackage.enable();
      this.formPackage.get('unidad')?.setValue(1);
      this.formPackage.get('blister')?.setValue(2);
      this.formPackage.get('blister')?.setValidators(Validators.min(2));
      this.formPackage.get('blister')?.updateValueAndValidity();
      this.formPackage.get('caja')?.setValue(2);
      this.formPackage.get('caja')?.setValidators(Validators.min(2));
      this.formPackage.get('caja')?.updateValueAndValidity();
      this.formPackage.get('pallet')?.setValue(2);
      this.formPackage.get('pallet')?.setValidators(Validators.min(2));
      this.formPackage.get('pallet')?.updateValueAndValidity();
      this.formPackage.get('pieza')?.setValue(1);
    }else if(changes?.['huella'].currentValue == 'Nivel5'){
      this.formPackage.enable();
      this.formPackage.get('unidad')?.setValue(1);
      this.formPackage.get('blister')?.setValue(2);
      this.formPackage.get('blister')?.setValidators(Validators.min(2));
      this.formPackage.get('blister')?.updateValueAndValidity();
      this.formPackage.get('caja')?.setValue(2);
      this.formPackage.get('caja')?.setValidators(Validators.min(2));
      this.formPackage.get('caja')?.updateValueAndValidity();
      this.formPackage.get('pallet')?.setValue(2);
      this.formPackage.get('pallet')?.setValidators(Validators.min(2));
      this.formPackage.get('pallet')?.updateValueAndValidity();
      this.formPackage.get('pieza')?.setValue(1);
      this.formPackage.get('pieza')?.setValidators(Validators.min(2));
      this.formPackage.get('pieza')?.updateValueAndValidity();
    }
  }

}
