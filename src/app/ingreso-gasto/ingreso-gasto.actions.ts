import { createAction, props } from '@ngrx/store';
import { IngresoGasto } from '../models/ingreso-gasto.model';

export const unSetItems = createAction('[Ingreso-Gasto] Unset Items');
export const setItems = createAction(
  '[Ingreso-Gasto] Set Items',
  props<{ items: IngresoGasto[] }>()
);