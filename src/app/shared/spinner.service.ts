import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  idLoading$ = new Subject<boolean>();
  constructor() { }
  show():void{
    this.idLoading$.next(true);
  }
  hide():void{
    this.idLoading$.next(false);
  }
}
