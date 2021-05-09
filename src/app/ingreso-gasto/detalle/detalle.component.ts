import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { IngresoGasto } from '../../models/ingreso-gasto.model';
import { IngresoGastoService } from '../../services/ingreso-gasto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosGastos: IngresoGasto[] = [];
  detalleSubs: Subscription;

  constructor( private store: Store<AppState>,
               private ingresoGastoService: IngresoGastoService ) { 
    this.detalleSubs = this.store.select('ingresosGastos').subscribe( ({ items }) => this.ingresosGastos = items );
  }

  ngOnInit(): void {    
  }

  ngOnDestroy() {
    this.detalleSubs.unsubscribe();
  }

  borrar( uid: string ) {
    this.ingresoGastoService.borrarIngresoGasto( uid )
      .then( () => {
        Swal.fire( 'Eliminado', 'Item borrado', 'success');
      })
      .catch( err => {
        Swal.fire( 'Error', err.message, 'error');
      })
  }

}
