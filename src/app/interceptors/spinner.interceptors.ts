import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { SpinnerService } from '../shared/spinner.service';
@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor{
  constructor( private SpinnerService:SpinnerService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.SpinnerService.show();
    return next.handle(req).pipe(
      finalize(()=> this.SpinnerService.hide()));
  }
}
