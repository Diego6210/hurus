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

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;

  Usuarios: any = [];
  columnas: string[] = ['Img', 'Nombre', 'Tags', 'Acciones'];

  usuarioModal: string;
  keyword = 'name';
  data = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private server: ServerService
  ) { }

  ngOnInit(): void {
    this.getDataFromSource();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  route(tipo) {

    this.modalService.dismissAll();
    if (tipo == 'web')
      this.router.navigateByUrl('newObjectWeb/');
    else
      this.router.navigateByUrl('newObject/');
  }

  getDataFromSource() {

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {

        var foto = 'assets/img/default-avatar.png';

        //this.server.getTargetFoto(data['list'][i]['_id']).subscribe((res) => {
          //if (res['data'] != null)
            //foto = 'data:image/jpg;base64,' + res['data']; 
          //else
            //foto = 'assets/img/default-avatar.png';
          let router = '/dataObject/';
          if (data['list'][i]['web'])
            router = '/dataObjectWeb/'

          var tags = '';
          var tagColor = '';
          if (data['list'][i]['tags'][0]['tag'] != undefined) {
            tags = data['list'][i]['tags'][0]['tag'];
            tagColor = data['list'][i]['tags'][0]['tagcolor'];
          }


          this.Usuarios.push({

            'tipo': data['list'][i]['web'],
            'Img': foto,
            'name': data['list'][i]['name'],
            'targets': data['list'][i]['targets'],
            'tag': tags,
            'tagColor': tagColor,
            'id': data['list'][i]['_id'],
            'Path': router + data['list'][i]['_id']
          });

          this.data.push({
            'id': data['list'][i]['_id'],
            'Img': foto,
            'name': data['list'][i]['name']
          });

          this.dataSource = new MatTableDataSource(this.Usuarios);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        //});
      }
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  selectEvent(item) {
    alert(item)
  }
}
