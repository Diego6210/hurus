import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { formatDate } from '@angular/common';


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
    private localStorange: LocalStorageService
  ) {  }

  uploadFile(archivo, user) {
    return this.http.post(`${this.URL}upload/${user}`, archivo);
  }

  uploadReport(archivo, descripcion, nombre, proyect) {

    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('name', nombre);
    formData.append('descripcion', descripcion);
    formData.append('proyect', proyect);
    formData.append('reporter', '0');
    formData.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}upload/report`, formData, httpOptions);
  }

  signin(email, password) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', email);
    urlSearchParams.append('password', password);

    return this.http.post(`${this.URL}login/`, urlSearchParams.toString(), httpOptions);
  }

  getProyect() {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}proyect/`, urlSearchParams.toString(), httpOptions);
  }

  setProyecto(name, description, tag) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', name);
    urlSearchParams.append('description', description);
    urlSearchParams.append('tag', tag);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}proyect/add/`, urlSearchParams.toString(), httpOptions);
  }

  setDeletProyecto(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}proyect/add/`, urlSearchParams.toString(), httpOptions);
  }

  getDataProyect(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}proyect/find/`, urlSearchParams.toString(), httpOptions);
  }

  getProyectTarget(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/`, urlSearchParams.toString(), httpOptions);
  }

  getDataTargetFind(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/find`, urlSearchParams.toString(), httpOptions);
  }

  getTarget() {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/`, urlSearchParams.toString(), httpOptions);
  }


  setTargetAdd(name, date, bussines, civil_state, sex, proyect, targets, account, tags, location, imagen, tipo) {

    if (imagen == "assets/img/default-avatar.png")
      imagen = null;

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', name);
    urlSearchParams.append('date', date);
    urlSearchParams.append('bussines', bussines);
    urlSearchParams.append('civil_state', civil_state);
    urlSearchParams.append('sex', sex);
    urlSearchParams.append('proyect', proyect);
    urlSearchParams.append('targets', targets);
    urlSearchParams.append('account', account);
    urlSearchParams.append('tags', tags);
    urlSearchParams.append('location', location);
    urlSearchParams.append('archivo', imagen);
    urlSearchParams.append('web', tipo);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/add/`, urlSearchParams.toString(), httpOptions);
  }

  
  setTargetAddWeb(name, proyect, targets, account, tags, location, imagen, tipo, url) {

    if (imagen == "assets/img/default-avatar.png")
      imagen = null;

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', name);
    urlSearchParams.append('proyect', proyect);
    urlSearchParams.append('targets', targets);
    urlSearchParams.append('account', account);
    urlSearchParams.append('tags', tags);
    urlSearchParams.append('location', location);
    urlSearchParams.append('archivo', imagen);
    urlSearchParams.append('url', url);
    urlSearchParams.append('web', tipo);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/add/`, urlSearchParams.toString(), httpOptions);
  }

  setTargetAccounts(id, data) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('data', JSON.stringify({ account: data }));
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/update/`, urlSearchParams.toString(), httpOptions);
  }

  setTargetLocation(id, data) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('data', JSON.stringify({ location: data }));
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/update/`, urlSearchParams.toString(), httpOptions);
  }

  setTargetData(id, name, date, bussines, civil_state, sex) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('data', JSON.stringify({ name: name, date: date, bussines: bussines, civil_state: civil_state, sex: sex }));
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/update/`, urlSearchParams.toString(), httpOptions);
  }

  setTargetDataWeb(id, name, url) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('data', JSON.stringify({ name: name, url: url}));
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/update/`, urlSearchParams.toString(), httpOptions);
  }

  setTargetperfil(id, foto) {

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('archivo', foto);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/profile/update/`, urlSearchParams.toString(), httpOptions);
  }

  getTargetFoto(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/profile/`, urlSearchParams.toString(), httpOptions);
  }

  getTargetObjetivos(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}target/list/`, urlSearchParams.toString(), httpOptions);
  }

  getReport(id) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('token', this.localStorange.getStorage('token'));

    return this.http.post(`${this.URL}report/`, urlSearchParams.toString(), httpOptions);
  }
}
