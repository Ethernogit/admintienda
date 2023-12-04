import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from './shared/auth-state.service';
import { first, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthStateService) {}

  canActivate(): Observable<boolean> {
    return this.auth.userAuthState.pipe(
      tap((isLoggedIn: boolean) => {
        console.log(isLoggedIn);
        console.log("Entré al guardia de ruta");

        if (!isLoggedIn) {
          console.log("No está autenticado, redireccionando...");
          this.router.navigate(['/login']); // Usuario no autenticado, redirige al login
        }
      }),
      map((isLoggedIn: boolean) => isLoggedIn) // Retornar el valor de isLoggedIn como booleano
    );
  }

}
