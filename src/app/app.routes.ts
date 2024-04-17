import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { IncatMuelleComponent } from './incat-muelle/incat-muelle.component';
import { ProductoComponent } from './productos/producto/producto.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'menu',component: MenuComponent},
    { path: 'usuario',component: UsuarioComponent},
    { path: 'ICatMuelle',component: IncatMuelleComponent},
    { path: 'producto',component: ProductoComponent}
];
