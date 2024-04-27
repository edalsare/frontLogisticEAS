import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { HuellaService } from '../../services/huella.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PackageComponent } from './package/package.component';
import { ProporcionesComponent } from './proporciones/proporciones.component';
import { IPackage } from '../../models/package';
import { IProporcion } from '../../models/proporcion';
import { UsuarioService } from '../../services/usuario.service';
import { IUsers } from '../../models/users.model';
import { IHuella } from '../../models/huella';
import { AlertOkComponent } from '../../alerts/alert-ok/alert-ok.component';

@Component({
  selector: 'app-huella',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MenuComponent,
    PaginationModule,
    FormsModule,
    PackageComponent,
    ProporcionesComponent,
    AlertOkComponent,
  ],
  templateUrl: './huella.component.html',
  styleUrl: './huella.component.css',
})
export class HuellaComponent implements OnInit {
  formHuella: FormGroup;
  producto: any[] = [];
  pagedData: any[] = [];
  nivel: string = '';
  package: IPackage = {} as IPackage;
  proporcion: IProporcion = {} as IProporcion;
  collapse: string = '';
  user: IUsers = {} as IUsers;
  dataTable: Array<any> = [];
  banOk: boolean = false;
  mensaje: string = '';

  //manejan estado boton registrar
  ban: boolean = true;
  ban2: boolean = true;

  _TraceService = inject(HuellaService);
  _Usuario = inject(UsuarioService);

  huella: string[] = ['Nivel1', 'Nivel2', 'Nivel3', 'Nivel4', 'Nivel5'];

  itemsPerPage = 10;
  currentPage = 1;
  totalItems: number = 0;

  constructor(private form: FormBuilder) {
    this.formHuella = this.form.group({
      nivel: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._TraceService.readProductByTrace().subscribe({
      next: (data) => {
        this.producto = data;
        this.totalItems = data.length;
        this.pageChanged();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  //Maneja paginacion tabla
  pageChanged(event: any = null): void {
    if (event) {
      this.currentPage = event.page;
    }
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    this.pagedData = this.producto.slice(startItem, endItem);
  }

  //maneja evento change del select huella
  onSelect() {
    this.nivel = this.formHuella.get('nivel')?.value;
  }

  limpiarCampos() {
    this.nivel = '';
    this.formHuella.get('nivel')?.setValue('');
    this.ban = true;
    this.ban2 = true;
    this.mensaje = '';
    this.banOk = false;
  }

  enviar() {
    this.user = this._Usuario.getUsario();
    const idProduct: number = this.dataTable[0];
    const trace: IHuella = {
      name_trace: this.formHuella.get('nivel')?.value,
    };

    this._TraceService
      .postHuella(idProduct, trace, this.package, this.proporcion)
      .subscribe({
        next: (data) => {
          this.ngOnInit();
          this.nivel = '';
          this.formHuella.get('nivel')?.setValue('');
          this.ban = true;
          this.ban2 = true;
          this.mensaje =
            'Huella creada satisfactoriamente para el producto ' + idProduct;
          this.banOk = true;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  obtenerDatos(index: number) {
    this.banOk = false;
    this.dataTable = this.pagedData[index];
  }

  manejarPackage(packages: IPackage) {
    this.package = packages;
    if (Object.keys(this.package).length === 0) {
      this.ban = true;
    } else {
      this.ban = false;
    }
  }

  manejarPorporcion(proporcion: IProporcion) {
    this.proporcion = proporcion;
    if (Object.keys(this.proporcion).length === 0) {
      this.ban2 = true;
    } else {
      this.ban2 = false;
    }
  }
}
