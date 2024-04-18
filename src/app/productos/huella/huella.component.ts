import { CommonModule } from '@angular/common';
import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { HuellaService } from '../../services/huella.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PackageComponent } from './package/package.component';
import { ProporcionesComponent } from './proporciones/proporciones.component';

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

  pageChanged(event: any = null): void {
    if (event) {
      this.currentPage = event.page;
    }
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.pagedData = this.producto.slice(startItem, endItem);
  }

  enviar(){

  }

}
