import { Component, OnInit, ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  
  Proyectos:any = [];
  columnas: string[] = ['proyecto', 'descripcion', 'tag','acciones'];
  
  tagsModal: string;
  descripcionModal: string;
  nombreModal: string;
  
  constructor(
    private modalService: NgbModal,
    private server: ServerService
  ) {    
  }

  ngOnInit(): void {
    this.getDataFromSource();
  }

  
  Agregar(){

    this.server.setProyecto(this.nombreModal,this.descripcionModal,this.tagsModal).subscribe((data) => {
      
      if(!data['err']){
        Swal.fire({
          icon: 'success',
          text:data['message']
        });
        this.nombreModal = '';
        this.descripcionModal= '';
        this.tagsModal= '';
        this.getDataFromSource();
        this.modalService.dismissAll();
      }else{
        Swal.fire({
          icon: 'error',
          text: data['message']
        });
      }

    });

  }
  
  Delet(_id){
    Swal.fire({
      title: 'Desea eliminar el proyecto?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {
        /*this.server.setDeletProyecto(id).subscribe((data) => {
          if(!data['err'])
            this.getDataFromSource();
          else{
            Swal.fire({
              icon: 'error',
              title: 'Algo salio mal...',
              text: data['message']
            });
          }
        });*/
        this.getDataFromSource();
      }
    })
  }

  openLg(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }

  getDataFromSource() {

    this.Proyectos = [];

    this.server.getProyect().subscribe((data) => {
      for(let i = 0; i < data['list'].length; i++){
        this.Proyectos.push({
          'description': data['list'][i]['description'],
          'name': data['list'][i]['name'],
          'owner': data['list'][i]['owner'],
          'tag': data['list'][i]['tag'],
          'id': data['list'][i]['_id'],
          'Path': '/project/' +  data['list'][i]['_id']

        });
      }

      this.dataSource = new MatTableDataSource(this.Proyectos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  } 

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 
}
