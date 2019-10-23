import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    const promesa = new Promise(( resolve, reject) => {
    let contador = 0;
    let intervalo = setInterval( () => {

        contador += 1;
        console.log( contador );
        if (contador === 3) {
          resolve();
          clearInterval(intervalo);
        }

      }, 1000);

    });

    // promesa.then(
    //   () => console.log('termino'),
    //   () => console.log('Error')
    // )
    promesa.then(
      () => console.log('termino'),
    )
    // tslint:disable-next-line: align
    .catch ( error  => console.log('Error en la Promesa', error ));

  }

  ngOnInit() {
  }

}
