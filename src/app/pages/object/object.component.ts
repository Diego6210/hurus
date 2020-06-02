import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const statesWithFlags: { name: string, flag: string }[] = [
  { 'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
  { 'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' }
];
@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  private url: string = environment.server + 'imagen/';

  Usuarios: any = [];
  columnas: string[] = ['Img', 'Nombre', 'Tags', 'Acciones'];

  usuarioModal: string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private server: ServerService
  ) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { name: string }) => x.name;

  ngOnInit(): void {
    this.getDataFromSource();

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  route() {
    this.modalService.dismissAll();
    this.router.navigateByUrl('newObject/');
  }

  getDataFromSource() {

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {
        this.Usuarios.push({
          Img: 'assets/img/default-avatar.png',
          'name': data['list'][i]['name'],
          'targets': data['list'][i]['targets'],
          'tag': data['list'][i]['tags'][0]['tag'],
          'tagColor': data['list'][i]['tags'][0]['tagcolor'],
          'id': data['list'][i]['_id'],
          'Path': '/dataObject/' + data['list'][i]['_id']
        });
      }

      this.dataSource = new MatTableDataSource(this.Usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
