import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  userSubs: Subscription;

  constructor( private store: Store<AppState> ) {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( ({user}) => user != null )
      )
      .subscribe( ({ user }) => {
        this.nombre = user!.nombre;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
  }

}
