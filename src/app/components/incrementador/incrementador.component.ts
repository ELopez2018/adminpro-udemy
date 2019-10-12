import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @ViewChild('txtprogress') txtProgress: ElementRef;
  @Input () leyenda: string = 'Leyenda';
  @Input ()progreso: number = 45;
  @Output() CambioValor: EventEmitter<number> = new  EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges( newValue: any  ) {

  // const ElementoHTML: any = document.getElementsByName('progreso')[0];

  // console.log(this.txtProgress);
  // console.log(ElementoHTML.value);

  if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
    this.progreso = newValue;
    }
  // ElementoHTML.value = this.progreso;
  this.txtProgress.nativeElement.value = this.progreso;

  this.CambioValor.emit( this.progreso );
  }
CambiarValor( valor: number ) {
      if (this.progreso >= 100 && valor > 0 ) {
        this.progreso = 100;
        return;
      }
      if (this.progreso <= 0 &&  valor < 0) {
        this.progreso = 0;
        return;
      }
      this.progreso += valor;

      this.CambioValor.emit( this.progreso );

      this.txtProgress.nativeElement.focus();
  }
}
