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
}
