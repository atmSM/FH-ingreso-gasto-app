import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoGasto } from '../models/ingreso-gasto.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoGastoService {

  constructor( private firestore: AngularFirestore,
               private authService: AuthService ) { }

  crearIngresoGasto( ingresoGasto: IngresoGasto ) {
    const uid = this.authService.user?.uid;
    
    // const { descripcion, importe, tipo } = ingresoGasto;
    delete ingresoGasto.uid;

    return this.firestore.doc(`${ uid }/ingresos-gastos`)
      .collection('items')
      .add({ ...ingresoGasto });
      // .add({ descripcion, importe, tipo });
  }

  initIngresosGastosListener( uid: string ) {
    return this.firestore.collection(`${ uid }/ingresos-gastos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            })
          )
        )
      );
  }

  borrarIngresoGasto( uidItem: string ) {
    const uid = this.authService.user?.uid;
    return this.firestore.doc(`${ uid }/ingresos-gastos/items/${ uidItem }`).delete();
  }
}
