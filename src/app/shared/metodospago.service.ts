import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment.local';
@Injectable({
  providedIn: 'root'
})
export class MetodospagoService {

  constructor(
    private http: HttpClient,

  ) { }
  private apiUrl: string = environment.apiUrl;
  RegistraMetodo(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('metodo', data.value.metodo);
    formData.append('activo', data.value.activo);
    return this.http.post(this.apiUrl+'/api/Metodos/RegistraMetodo',formData);
  }
  listarMetodos():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.apiUrl+'/api/Metodos/listarMetodos',{headers:headers});
  }
  EditarMetodo(data:any):Observable<any>{
    const formData = new FormData();
    formData.append('id_metodo', data.value.id_metodo);
    formData.append('metodo', data.value.metodo);
    formData.append('activo', data.value.activo);
    return this.http.post(this.apiUrl+'/api/Metodos/EditarMetodo',formData);
  }
}
