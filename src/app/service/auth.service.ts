import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { CanActivate, Router } from '@angular/router';
import { ServerService } from './server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate  {

  constructor(
    private localStorange:LocalStorageService,
    private route : Router,
    private server: ServerService
  ) { }

  isAuthenticated() : Boolean {

    /*this.server.signin('admin','123').subscribe((res) => {
      alert(res)
      console.log(res)
    })*/

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
