import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-gasto.actions';
import { IngresoGasto } from '../models/ingreso-gasto.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoGasto[] | []; 
}

export interface AppStateWithIngresoGasto extends AppState{
    ingresosGastos: State
}

export const initialState: State = {
   items: [],
}

const _ingresoGastoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unSetItems, (state) => ({ ...state, items: [] })),

);

export function ingresoGastoReducer(state: State | undefined, action: Action) {
    return _ingresoGastoReducer(state, action);
}