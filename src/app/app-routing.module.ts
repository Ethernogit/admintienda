import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PanelComponent } from './components/panel/panel.component';
import { FormulariofabricaComponent } from './components/fabricadarafe/formulariofabrica/formulariofabrica.component';
import { MetalesComponent } from './components/productos/metales/metales.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { PiedrasComponent } from './components/piedras/piedras.component';
import { ConfiguracionproductoComponent } from './components/productos/configuracionproducto/configuracionproducto.component';
import { AuthGuard } from './auth.guard';
import { EditarComponent } from './components/productos/editar/editar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { DetallecompraComponent } from './components/detallecompra/detallecompra.component';
import { MetodospagoComponent } from './components/metodospago/metodospago.component';
import { ProductosproveedorComponent } from './components/productosproveedor/productosproveedor.component';

const routes: Routes = [
  { path: '', redirectTo: '/panel', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'panel', canActivate: [AuthGuard], component: PanelComponent },
  { path: 'fabrica/fabrica', component: FormulariofabricaComponent },
  { path: 'fabrica/metales/:id', component: MetalesComponent },
  { path: 'productos/editar/:id', component: EditarComponent },
  { path: 'productos/configuraciones', component: ConfiguracionproductoComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'piedras', component: PiedrasComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'metodosdepago', component: MetodospagoComponent },
  { path: 'detallescompra/:idcompra', component: DetallecompraComponent },
  { path: 'productos/proveedor', component: ProductosproveedorComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
