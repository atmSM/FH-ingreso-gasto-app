import { Pipe, PipeTransform } from '@angular/core';

import { IngresoGasto } from '../models/ingreso-gasto.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform( items: IngresoGasto[] ): IngresoGasto[] {

    const ingresosGastos = [ ...items ];

    return ingresosGastos.sort( (a, b) => {

      if ( a.tipo === 'ingreso' ) {
        return -1;
      } else {
        return 1;
      }

    });
  }

}
