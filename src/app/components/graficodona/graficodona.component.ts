import { Component, OnInit, Input } from '@angular/core';
import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styleUrls: ['./graficodona.component.css']
})
export class GraficodonaComponent implements OnInit {
 // Doughnut
 @Input()  doughnutChartLabels: Label[] = ['s'];
 @Input()  doughnutChartData: MultiDataSet = [];
 @Input()  doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit() {
  }

}
