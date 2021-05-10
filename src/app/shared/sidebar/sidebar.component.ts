import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string = '';
  email: string = '';
  userSubs: Subscription;

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState> ) { 
    this.userSubs = this.store.select('user')
      .pipe(
        filter( ({user}) => user != null )
      )
      .subscribe( ({ user }) => {
        this.nombre = user!.nombre;
        this.email = user!.email;
      });
  }

  ngOnInit(): void {    
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
  }

  logout() {
    this.authService.logout()
      .then( () => {
        this.router.navigate(['/login'])
      })
      .catch( (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
