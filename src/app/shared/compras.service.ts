import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment.local';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {


  constructor(
    private http: HttpClient,

  ) { }
  private apiUrl: string = environment.apiUrl;
  consultarcompras():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.apiUrl+'/api/compras/listcompras',{headers:headers});
  }
  detallecompra(id_compra:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.apiUrl+'/api/compras/detallecompra/'+id_compra,{headers:headers});
  }
  guardarguia(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    const formData = new FormData();
    formData.append('guia', data.value.guia);
    formData.append('id_compra', data.value.id_compra);
    return this.http.post(this.apiUrl+'/api/compras/guardarguia',formData);
  }
  GuardarStatus(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('status', data.value.status);
    formData.append('id_compra', data.value.id_compra);
    return this.http.post(this.apiUrl+'/api/compras/GuardarStatus',formData);
  }
}
