import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/',
    tema: 'green-Baru-dark'
  };
  // tslint:disable-next-line: deprecation
  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
   }
  guardarAjustes() {
    // console.log('Guardado en local Storage');
    localStorage.setItem('Ajustes', JSON.stringify(this.ajustes));
  }
  cargarAjustes() {
    if (localStorage.getItem('Ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('Ajustes'));
      // console.log('Cargando  del local Storage');
      this.aplicarTema( this.ajustes.tema )
    } else {
      // console.log('Usando valores por defecto');
      this.aplicarTema( this.ajustes.tema )
    }
  }


  aplicarTema( tema: string ) {
    const url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
