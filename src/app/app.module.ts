import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelComponent } from './components/panel/panel.component';
import { FormulariofabricaComponent } from './components/fabricadarafe/formulariofabrica/formulariofabrica.component';
import { MetalesComponent } from './components/productos/metales/metales.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalmetalesComponent } from './components/fabricadarafe/modalmetales/modalmetales.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { SpinnerModule } from './components/spinner/spinner.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PiedrasComponent } from './components/piedras/piedras.component';
import { NgxTinymceModule } from 'ngx-tinymce';
import { CrearproductoComponent } from './components/productos/crearproducto/crearproducto.component';
import { ListarproductosComponent } from './components/productos/listarproductos/listarproductos.component';
import { ConfiguracionproductoComponent } from './components/productos/configuracionproducto/configuracionproducto.component';
import { EditarComponent } from './components/productos/editar/editar.component';
import { ComprasComponent } from './components/compras/compras.component';
import { DetallecompraComponent } from './components/detallecompra/detallecompra.component';
import { MetodospagoComponent } from './components/metodospago/metodospago.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductosproveedorComponent } from './components/productosproveedor/productosproveedor.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    PanelComponent,
    FormulariofabricaComponent,
    MetalesComponent,
    ModalmetalesComponent,
    CategoriasComponent,
    PiedrasComponent,
    CrearproductoComponent,
    ListarproductosComponent,
    ConfiguracionproductoComponent,
    EditarComponent,
    ComprasComponent,
    DetallecompraComponent,
    MetodospagoComponent,
    NavbarComponent,
    ProductosproveedorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ModalModule.forRoot(), // agregue este módulo
    SpinnerModule,
    NgbModule,
    NgxTinymceModule.forRoot({
      baseURL: '../assets/tinymce/',
      // or cdn
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
