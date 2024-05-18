import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { IncatMuelleComponent } from './incat-muelle/incat-muelle.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { HuellaComponent } from './productos/huella/huella.component';
import { FacturaComponent } from './cantidades/factura/factura.component';
import { IngresoComponent } from './cantidades/ingreso/ingreso.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'ICatMuelle', component: IncatMuelleComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'huella', component: HuellaComponent },
  { path: 'factura', component: FacturaComponent},
  { path: 'ingreso', component: IngresoComponent}
];
