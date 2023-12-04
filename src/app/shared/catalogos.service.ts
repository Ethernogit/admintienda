import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaz/categoria';
import { OtrosPagos } from '../interfaz/otrospagos';
import { gramometalkilate } from '../interfaz/gramometalkilate';
import { environment } from 'src/environment.local';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(
    private http: HttpClient,

  ) { }
    private apiUrl: string = environment.apiUrl;

    // registrar
    rcategoria(category: Category): Observable<any> {
      return this.http.post<any>(this.apiUrl+'/api/catalogo/rcategoria', category);
    }
    // listar
    lcategoria(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/api/catalogo/lcategoria');
    }
    // metales
    lmetales(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/api/catalogo/lmetales');
    }
    // kilates
    lkilates(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/api/catalogo/lkilates');
    }
    // envios
    lenvios(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/api/catalogo/lenvios');
    }
    //minimo envios
    menvios(): Observable<any> {
      return this.http.get<any>(this.apiUrl+'/api/catalogo/menvios');
    }
    // guarda envio
    genvio(envios:OtrosPagos): Observable<any> {
      return this.http.post<any>(this.apiUrl+'/api/catalogo/genvios',envios);
    }
    //envios
    minimoenvio(envios:any): Observable<any> {
      console.log(envios);

      const formData = new FormData();
      formData.append('cantidad', envios.value.minimocantidad);
      return this.http.post<any>(this.apiUrl+'/api/catalogo/minimoenvio',formData);
    }
    lorogramo(tipo:number):Observable<any>{
      return this.http.post<any>(this.apiUrl+'/api/catalogo/lorogramo',tipo);
    }
    // guarda precios oro amarillo
    lorosave(datos:gramometalkilate): Observable<any> {
      return this.http.post<any>(this.apiUrl+'/api/catalogo/lorosave',datos);
    }
    rpiedras(image: File, name: string) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('piedra', name);
      return this.http.post<any>(this.apiUrl+'/api/catalogo/rpiedras',formData);
    }
    limgpiedras(){
      return this.http.get<any>(this.apiUrl+'/api/catalogo/limgpiedras');
    }
    rproveedor(proveedor: any) {
      const formData = new FormData();
      formData.append('nombre_proveedor', proveedor.nombre_proveedor);
      formData.append('email_proveedor',proveedor.email_proveedor);
      formData.append('telefono', proveedor.telefono);
      formData.append('diez',proveedor.diez);
      formData.append('catorce', proveedor.catorce);
      formData.append('dieciocho',proveedor.dieciocho);
      formData.append('ganancia',proveedor.ganancia);

      return this.http.post<any>(this.apiUrl+'/api/catalogo/rproveedor',formData);
    }
    lproveedor(){
      return this.http.get<any>(this.apiUrl+'/api/catalogo/lproveedor');
    }
    infoproveedor(id_proveedor:any){
      return this.http.get<any>(this.apiUrl+'/api/catalogo/infoproveedor/'+id_proveedor);
    }
    guardaproveedoredit(proveedor: any) {
      const formData = new FormData();
      formData.append('id_proveedor', proveedor.id_proveedor);
      formData.append('nombre_proveedor', proveedor.nombre_proveedor);
      formData.append('diez',proveedor.diez);
      formData.append('catorce', proveedor.catorce);
      formData.append('dieciocho',proveedor.dieciocho);
      formData.append('ganancia',proveedor.ganancia);

      return this.http.post<any>(this.apiUrl+'/api/catalogo/guardaproveedoredit',formData);
    }
}
