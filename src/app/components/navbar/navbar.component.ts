import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
interface ResponseData {
  access_token: string;
  // Otras propiedades si las hay
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isCollapsed = false;

  closeNav() {
    this.isCollapsed = true;
  }
  isSignedIn!: boolean;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService
  ) {

  }
  ngOnInit() {
    this.token.statusback().subscribe({
      next: ({ access_token }: ResponseData) => {
        localStorage.setItem('auth_token', access_token);
        this.token.isLoggedIn();
        this.auth.setAuthState(true);
      },
      error: (error) => {
        this.auth.setAuthState(false);
        this.token.removeToken();
        this.router.navigate(['login']);
      }
    });
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
  }
}
