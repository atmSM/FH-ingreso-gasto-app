import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoGastoActions from '../ingreso-gasto/ingreso-gasto.actions';

import { IngresoGastoService } from '../services/ingreso-gasto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingresosGastosSubs: Subscription | undefined;

  constructor( private store: Store<AppState>,
               private ingresoGastoService: IngresoGastoService ) { 
    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({ user }) => {
        this.ingresosGastosSubs = this.ingresoGastoService.initIngresosGastosListener( user!.uid )
          .subscribe( ingresosGastosFB => {
            this.store.dispatch( ingresoGastoActions.setItems({ items: ingresosGastosFB }) );
          });
      } );
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.ingresosGastosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
