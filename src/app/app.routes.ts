import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'menu',component: MenuComponent},
    { path: 'usuario',component: UsuarioComponent}
];
