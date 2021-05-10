import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { IngresoGasto } from '../models/ingreso-gasto.model';
import { IngresoGastoService } from '../services/ingreso-gasto.service';

import * as ui from '../shared/ui.actions';
import { isLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-gasto',
  templateUrl: './ingreso-gasto.component.html',
  styles: [
  ]
})
export class IngresoGastoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs: Subscription;

  constructor( private fb: FormBuilder,
               private ingresoGastoService: IngresoGastoService,
               private store: Store<AppState> ) {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required ],
      importe: ['', [Validators.required, Validators.min(0.01)] ],
    });

    this.loadingSubs = this.store.select('ui').subscribe( ({ isLoading }) => this.cargando = isLoading );
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar() {

    if ( this.ingresoForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    const { descripcion, importe } = this.ingresoForm.value;

    const ingresoGasto = new IngresoGasto( descripcion, importe, this.tipo );

    this.ingresoGastoService.crearIngresoGasto( ingresoGasto )
      .then( () => { 
        this.ingresoForm.reset();
        this.store.dispatch( ui.stopLoading() );
        Swal.fire( 'Registro creado', descripcion, 'success');
      } )
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire( 'Error', err.message, 'error');
      } );
  }
  
}
