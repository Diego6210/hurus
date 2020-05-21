import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate  {

  constructor(
    private localStorange:LocalStorageService,
    private route : Router
  ) { }

  isAuthenticated() : Boolean {
    let userData = this.localStorange.getStorage('userInfo');
    console.log(userData);
    if(userData != null || userData != undefined){
      return true;
    }

    return false;
  }

  canActivate(){
    if(this.isAuthenticated()){
      return true;
    }
    this.route.navigate(['login']);
    return false;
  }
}
