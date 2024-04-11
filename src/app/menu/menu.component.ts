import { Component, OnInit, inject } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { IUsers } from '../models/users.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    RouterLink, CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{

  private _apiServ = inject(ApiService)  
  mensaje: string = '';
  ban: boolean = true;

  ngOnInit(): void {

    this.mensaje = this._apiServ.getMensaje();
    this.ban = this._apiServ.getBan();
   
  }

  hiden(){
    this.ban = true;
    this._apiServ.setVar('', true);
  }

}
