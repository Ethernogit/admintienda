import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from '../shared/token.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  // private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  // userAuthState = this.userState.asObservable();

  // constructor(private token: TokenService) {}

  // setAuthState(value: boolean) {
  //   this.userState.next(value);
  // }
  private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
  public modalState = new BehaviorSubject<boolean>(false);

  userAuthState = this.userState.asObservable();
  constructor(public token: TokenService) {}
  setAuthState(value: boolean) {
    this.userState.next(value);
  }
  openModal() {
    this.modalState.next(true);
  }
  closeModal() {
    this.modalState.next(false);
  }
}
