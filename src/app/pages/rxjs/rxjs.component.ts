import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {


  this.regresaObs().subscribe( numero => {
    console.log('Subs ', numero );
  });

  }

  ngOnInit() {
  }

  regresaObs(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador += 1;
        observer.next( contador );

        if (  contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }

        // if (  contador === 2 ) {
        //   clearInterval( intervalo );
        //   observer.error('Auxilio');
        // }

      }, 1000);

    });
  }
}
