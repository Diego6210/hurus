import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CanActivate, Router } from '@angular/router';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private localStorange: LocalStorageService,
    private route: Router,
    private server: ServerService
  ) { }

  isAuthenticated(): Boolean {

    let token = this.localStorange.getStorage('token');

    let expirafecha = Number(this.localStorange.getStorage('expira'));
    let expiraDate = new Date();
    let feha = new Date();

    expiraDate.setSeconds(expirafecha);
    feha.setSeconds(0);

    //console.log(expiraDate + ' - '+ feha);
    let expira = false;

    if (expirafecha < Number(feha)) {
      expira = true;
      this.localStorange.cleaStorage();
      this.route.navigate(['login']);
    }

    if (token != null || token != undefined) {
      return true;
    }

    return false;
  }

  canActivate() {
    if (this.isAuthenticated()) {
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}
