import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate() {

    if (this._usuarioService.estaLogeado()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      this.router.navigate(['/login']);
      console.log('Bloquedo por el Guard');
      return false
    }
  }

}
