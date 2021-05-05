import { createReducer, on, Action } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: Usuario,
}

export const initialState: State = {
  user: { uid: '', nombre: '', email: '' }
}

const _authReducer = createReducer<State, Action>(initialState,

    on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(unSetUser, (state) => ({ ...state, user: { uid: '', nombre: '', email: '' } })),

);

export function authReducer(state: State | undefined, action: Action) {
    return _authReducer(state, action);
}