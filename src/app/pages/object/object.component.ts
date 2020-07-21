import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
  private URL: string = environment.server;

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
            foto = `${this.URL}img/profile/${data['list'][i]['_id']}.jpg`; 

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

  mostrarRazon(){
    Swal.fire({
      text: "informacion",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modificar',
      cancelButtonText: 'Cerrar'
    }).then((result) => {
      if (result.value) {
        Swal.mixin({
          input: 'text',
          confirmButtonText: 'Guardar',
          showCancelButton: true,
        }).queue([
          {
            title: 'Cambiar la razón del objetivo de por que esta aqui'
          }
        ]).then((result) => {
          const answers = JSON.stringify(result.value)
          if (result.value) {
            Swal.fire({
              icon: 'success',
              text: 'Información guardada'
            });            
          }
        });
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
