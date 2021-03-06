import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Routes, Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();

  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }


  loginGoogle(token: string) {

    const URL = URL_SERVICIOS + '/login/google'
    return this.http.post(URL, { token: token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );

  }
  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login'
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    )

  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario'
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'USUARIO CREADO',
          icon: 'success'
        })
        return resp.usuario;
      })
    );

  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
        Swal.fire({
          title: 'USUARIO ACTUALIZADO',
          text: usuario.nombre,
          icon: 'success'
        });
        return true;
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp : any ) => {
        console.log(resp);
      this.usuario.img = resp.usuario.img;

        Swal.fire({
          title: 'IMAGEN ACTUALIZADA',
          text: resp.usuario.nombre,
          icon: 'success'
        });


      })

      .catch(resp => {
        console.log(resp);
      })

  }

}
