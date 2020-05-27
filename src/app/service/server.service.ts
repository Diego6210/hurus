import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private URL: string = environment.server;
  
  constructor(
    private http: HttpClient,
    private localStorange:LocalStorageService
  ) { }

  uploadFile(archivo,user) {
    return this.http.post(`${this.URL}upload/${user}`, archivo);
  }


  signin(email,password){
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', email);
    urlSearchParams.append('password', password);

    //let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');{headers: headers}
    
    return this.http.post(`${this.URL}login/`,urlSearchParams.toString(),httpOptions);
  }
  
  getCustomHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('token', this.localStorange.getStorage('token'));
    return headers;
  }

  proyect(){
/*
    let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append( 'token',  this.localStorange.getStorage('token'));*/


    const header = new HttpHeaders()
    .set('Content-Type', "application/json; charset=utf-8")
    .set('token', this.localStorange.getStorage('token'));
    
    return this.http.post(`${this.URL}proyect/`,null,{headers: this.getCustomHeaders()});
  }
}
