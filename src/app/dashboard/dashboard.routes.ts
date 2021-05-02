import { Routes } from '@angular/router';

import { EstadisticaComponent } from '../ingreso-gasto/estadistica/estadistica.component';
import { IngresoGastoComponent } from '../ingreso-gasto/ingreso-gasto.component';
import { DetalleComponent } from '../ingreso-gasto/detalle/detalle.component';

export const dashboardRoutes: Routes = [
  { path: '', component: EstadisticaComponent },
  { path: 'ingreso-gasto', component: IngresoGastoComponent },
  { path: 'detalle', component: DetalleComponent },
]