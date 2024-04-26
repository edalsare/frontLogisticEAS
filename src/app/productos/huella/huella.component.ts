import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { HuellaService } from '../../services/huella.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PackageComponent } from './package/package.component';
import { ProporcionesComponent } from './proporciones/proporciones.component';
import { IPackage } from '../../models/package';
import { IProporcion } from '../../models/proporcion';

@Component({
  selector: 'app-huella',
  standalone: true,
  imports: [ReactiveFormsModule,
      CommonModule,
      MenuComponent,
      PaginationModule,
      FormsModule, 
      PackageComponent, 
      ProporcionesComponent
  ],
  templateUrl: './huella.component.html',
  styleUrl: './huella.component.css'
})
export class HuellaComponent implements OnInit {

  formHuella: FormGroup;
  producto: any[] = [];
  pagedData:any[] = [];
  _TraceService = inject(HuellaService);
  nivel: string = '';
  package: IPackage = {} as IPackage;
  proporcion: IProporcion = {} as IProporcion;
  collapse: string = '';
  ban: boolean = true;
  ban2: boolean = true;

  huella: string[] =["Nivel1","Nivel2","Nivel3","Nivel4","Nivel5"]

  itemsPerPage = 10;
  currentPage = 1;
  totalItems: number = 0;


  constructor(private form: FormBuilder){
    this.formHuella = this.form.group({
      nivel: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this._TraceService.readProductByTrace().subscribe({
      next: data =>{
        this.producto = data;
        this.totalItems = data.length;
        this.pageChanged();   
      }
    })
  }

  //Manje paginacion tabla
  pageChanged(event: any = null): void {
    if (event) {
      this.currentPage = event.page;
    }
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.pagedData = this.producto.slice(startItem, endItem);
  }

  //maneja evento change del select huella
  onSelect(){
    this.nivel = this.formHuella.get('nivel')?.value;
  }

 

  enviar(){
    console.log(this.package)
    console.log(this.proporcion)

  }

  manejarPackage(packages: IPackage){
    this.package = packages;
    if(
      Object.keys(this.package).length === 0){
        this.ban = true;
    }else{
      this.ban = false;
    }
  }

  manejarPorporcion(proporcion: IProporcion){
    this.proporcion = proporcion;
    if(
      Object.keys(this.proporcion).length === 0){
        this.ban2 = true;
    }else{
      this.ban2 = false;
    }
  }

}
