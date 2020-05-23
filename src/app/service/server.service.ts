import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private URL: string = environment.server;

  constructor(private http: HttpClient) { }

  uploadFile(archivo,user) {
    return this.http.post(`${this.URL}upload/${user}`, archivo);
  }


  signin(email,password){

    //const formData = new FormData();
    //formData.append('email', email);
    //formData.append('password', password);

    return this.http.post(`${this.URL}signin/`, {'password': password,'email': email});
  }
}
