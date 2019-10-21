import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document,
               public _ajustes: SettingsService ) {  }
// working
  ngOnInit() {
    this.coloCarchek();
  }
  CambiarColor( tema: string, link: any ) {

    this.aplicarChek ( link );
    this._ajustes.aplicarTema( tema );
    // const url = `assets/css/colors/${ tema }.css`;
    // this._document.getElementById('tema').setAttribute('href', url);
    // this._ajustes.ajustes.tema = tema;
    // this._ajustes.ajustes.temaUrl = url;
    // this._ajustes.guardarAjustes();

  }

  aplicarChek(link: any ) {
    const selectores: any = document.getElementsByClassName('selector');

    for  ( const ref of selectores ) {
    ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  coloCarchek() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for  ( const ref of selectores ) {
        if ( ref.getAttribute('data-theme') === tema ) {
          ref.classList.add('working');
          break;
        }
      }
  }
}
