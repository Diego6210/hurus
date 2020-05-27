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

    let token = this.localStorange.getStorage('token');
    
    const expirafecha = Number(this.localStorange.getStorage('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expirafecha)

    console.log(expirafecha);

    console.log(expiraDate.setTime(expirafecha));
    let expira = false; 
    
    if(expiraDate > new Date())
      expira = true;    


    if(token != null || token != undefined || expira ){
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
