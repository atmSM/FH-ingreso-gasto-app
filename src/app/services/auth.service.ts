import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as ingresoGastoActions from '../ingreso-gasto/ingreso-gasto.actions';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription;
  private _user: Usuario | null = null;

  get user() {
    return this._user;
  }

  constructor( public auth: AngularFireAuth,
               private firestore: AngularFirestore,
               private store: Store<AppState> ) { }

  initAuthListener() {
    this.auth.authState.subscribe( fuser => {
      if ( fuser ) {
        // existe el ususario
        this.userSubscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {
            const user = Usuario.fromFirebase( firestoreUser );
            this._user = user;
            this.store.dispatch( authActions.setUser( { user } ) );
          });
      } else {
        // no existe el usuario
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( ingresoGastoActions.unSetItems() );
      }
    });
  }

  crearUsuario( nombre: string, correo: string, password: string ) {
    return this.auth.createUserWithEmailAndPassword( correo, password )
            .then( ({ user }) => {
              const newUser = new Usuario( user!.uid, nombre, correo );
              return this.firestore.doc(`${ user!.uid }/usuario`).set( {...newUser} );
            });
  }

  loginUsuario( email: string, password: string ) {
    return this.auth.signInWithEmailAndPassword( email, password );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null )
    );
  }
}
