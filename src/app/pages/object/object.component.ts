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
    if(tipo == 'web')
      this.router.navigateByUrl('newObjectWeb/');
    else
      this.router.navigateByUrl('newObject/');
  }

  getDataFromSource() {

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {

        var foto = 'assets/img/default-avatar.png';

        this.server.getTargetFoto(data['list'][i]['_id']).subscribe((res) => {
          if(res['data'] != null)
            foto = 'data:image/jpg;base64,' + res['data'];

          this.Usuarios.push({
            
            'tipo': false,
            'Img': foto,
            'name': data['list'][i]['name'],
            'targets': data['list'][i]['targets'],
            'tag': data['list'][i]['tags'][0]['tag'],
            'tagColor': data['list'][i]['tags'][0]['tagcolor'],
            'id': data['list'][i]['_id'],
            'Path': '/dataObject/' + data['list'][i]['_id']
          });
          
          this.dataSource = new MatTableDataSource(this.Usuarios);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      }
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Alabama',
      img:'5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
    }
  ];

  selectEvent(item) {
    alert(item)
  }
}
