import { Component, OnInit } from '@angular/core';

import { MultiDataSet, Label } from 'ng2-charts';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoGasto } from '../../models/ingreso-gasto.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  gastos: number = 0;

  totalIngresos: number = 0;
  totalGastos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Gastos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor( private store: Store<AppState> ) {
    this.store.select('ingresosGastos')
      .subscribe( ({ items }) => this.generarEstadistica( items ) );
   }

  ngOnInit(): void {
  }

  generarEstadistica( items: IngresoGasto[] ) {

    this.totalGastos = 0;
    this.totalIngresos = 0;
    this.gastos = 0;
    this.ingresos = 0;

    for ( const item of items ) {
      if ( item.tipo === 'ingreso' ) {
        this.totalIngresos += item.importe;
        this.ingresos ++;
      } else {
        this.totalGastos += item.importe;
        this.gastos ++;
      }
    }

    this.doughnutChartData = [[ this.totalIngresos, this.totalGastos ]];
  }

}
