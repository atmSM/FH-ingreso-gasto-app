import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';

import { StoreModule } from '@ngrx/store';
import { ingresoGastoReducer } from './ingreso-gasto.reducer';

import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoGastoComponent } from './ingreso-gasto.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoGastoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature( 'ingresosGastos', ingresoGastoReducer ),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutesModule
  ]
})
export class IngresoGastoModule { }
