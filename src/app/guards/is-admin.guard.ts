import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { TipoUsuario } from '../enums/tipo-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      map(user => {
        // tslint:disable-next-line: triple-equals
        if (user.tipo == TipoUsuario.administrador) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }
      )
    );
  }
}

