import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-ok',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-ok.component.html',
  styleUrl: './alert-ok.component.css'
})
export class AlertOkComponent {

  @Input() mensaje: string="";

}
