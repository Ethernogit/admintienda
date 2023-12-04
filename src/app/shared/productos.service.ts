import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Category } from '../interfaz/categoria';
import { OtrosPagos } from '../interfaz/otrospagos';
import { gramometalkilate } from '../interfaz/gramometalkilate';
import { environment } from 'src/environment.local';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private http: HttpClient,

  ) { }
  private apiUrl: string = environment.apiUrl;
  registrarproducto(imagenuno: File,imagengrabado:File, producto: any){
    const formData = new FormData();
    formData.append('imageuno', imagenuno);
    formData.append('imagengrabado', imagengrabado);
    formData.append('nombre', producto.nombre);
    formData.append('codigo', producto.codigo);
    formData.append('categoria', producto.categoria);
    formData.append('peso', producto.peso);
    formData.append('descripcion', producto.descripcion);
    formData.append('grabado', producto.grabado);
    formData.append('fabrica', producto.fabrica);
    formData.append('custom', producto.custom);
    formData.append('anillo', producto.anillo);
    formData.append('piedras', producto.piedras);

    formData.append('productoproveedor', producto.productoproveedor);
    formData.append('id_proveedor', producto.id_proveedor);
    formData.append('kilate', producto.kilate);
    formData.append('pesoproveedor', producto.pesoproveedor);
    formData.append('productocadena', producto.productocadena);

    return this.http.post<any>(this.apiUrl + '/api/crudproducto/rproducto',formData);
  }
  listarproductos(page:any,itemsPerPage:any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/listarproductos/'+page+'/'+itemsPerPage);
  }
  configuracionproducto(idproducto:number){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/configuracion/'+idproducto);
  }
  metalesproducto(idproducto:string){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/metales/'+idproducto);
  }
  metalstatus(tipo:any,status:any,idproducto:any){
    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('status', status);
    formData.append('idproducto', idproducto);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/metalstatus',formData);
  }
  productoinfo(idproducto:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/productoinfo/'+idproducto);
  }
  numeroscustom(idproducto:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/numeroscustom/'+idproducto);
  }
  registrarnumero(numero:any,peso:any,clave:any){
    const formData = new FormData();
    formData.append('numero', numero);
    formData.append('peso', peso);
    formData.append('clave',clave);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/rnumeros',formData);
  }
  registrarVariante(funo: File,fdos:File,ftres:File, piedrauno: any,piedrados:any,id_variantefabrica:any){
    const formData = new FormData();
    formData.append('imagenuno', funo);
    formData.append('imagendos', fdos);
    formData.append('imagentres', ftres);
    formData.append('piedrauno', piedrauno);
    formData.append('piedrados', piedrados);
    formData.append('id_variantefabrica', id_variantefabrica);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/rimgvariante',formData);
  }
  listarvariantes(id_variantefabrica:any,id_producto:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/listarvariantes/'+id_variantefabrica+'/'+id_producto);
  }
  registrarimgVariante(img:File,id_variantefabrica:any){
    const formData = new FormData();
    formData.append('img', img);
    formData.append('id_variantefabrica', id_variantefabrica);
    console.log(formData);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/registrarimgvariante',formData);
  }
  changekilate(id_variantefabrica:any,kilate:any,status:any){
    const formData = new FormData();
    formData.append('kilate', kilate);
    formData.append('status', status);
    formData.append('id_variantefabrica', id_variantefabrica);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/changekilate',formData);
  }

  destroyvariante(id_variante:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    const formData = new FormData();
    formData.append('id_variante', id_variante);
    return this.http.get(this.apiUrl+'/api/crudproducto/destroyvariante/'+id_variante,{headers:headers});
  }
  editarproducto(producto:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    const formData = new FormData();
    console.log(producto);

    formData.append('id_productos', producto.id_productos);
    formData.append('id_categoria', producto.id_categoria);
    formData.append('producto', producto.producto);
    formData.append('descripcion', producto.descripcion);
    formData.append('productocustom', producto.productocustom);
    formData.append('productofabrica', producto.productofabrica);
    formData.append('tipoanillo', producto.tipoanillo);
    formData.append('productocadena', producto.productocadena);
    formData.append('piedras', producto.piedras);
    formData.append('peso', producto.peso);
    formData.append('grabado', producto.grabado);
    formData.append('RFC', producto.RFC);
    formData.append('activo', producto.activo);
    return this.http.post(this.apiUrl+'/api/crudproducto/editarproducto',formData);
  }
  registrarimgProducto(img:File,id_productos:any){
    const formData = new FormData();
    formData.append('img', img);
    formData.append('id_productos', id_productos);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/registrarimgProducto',formData);
  }
  listaimgfabrica(id_producto:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/listaimgfabrica/'+id_producto);
  }

  registrarmedida(medida:any,){
    const formData = new FormData();
    formData.append('medida',medida.medida);
    formData.append('peso', medida.peso);
    formData.append('stock', medida.stock);
    formData.append('id_producto', medida.id_producto);
    return this.http.post<any>(this.apiUrl + '/api/crudproducto/registrarmedida',formData);
  }
  lmedidasproducto(id_producto:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/lmedidasproducto/'+id_producto);
  }
  stockmedida(id_productomedida:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/stockmedida/'+id_productomedida);
  }
  updatemedida(medida:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    const formData = new FormData();

    formData.append('medida', medida.medida);
    formData.append('peso', medida.peso);
    formData.append('stock', medida.stock);
    formData.append('id_medida', medida.id_medida);

    return this.http.post(this.apiUrl+'/api/crudproducto/updatemedida',formData);
  }
  eliminarmedida(id_medida:any){
    return this.http.get<any>(this.apiUrl + '/api/crudproducto/eliminarmedida/'+id_medida);
  }
}
