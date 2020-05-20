import { Component, OnInit, ViewChild  } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  private url: string = environment.server+'imagen/';
  
  Usuarios:any = [];
  columnas: string[] = ['Img', 'Nombre', 'FechaNacimiento','Tags', 'Acciones'];


  constructor() { }

  ngOnInit(): void {
    this.getDataFromSource();
  }

  finds(id){

  }

  getDataFromSource() {
    this.Usuarios = [{
      Img:'/assets/img/mike.jpg',
      Nombre:'Diego',
      FechaNacimiento:'11-06-1912',
      Tags:'diego',
      Path: '/dataObject/1'
    }];
    this.dataSource = new MatTableDataSource(this.Usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 

}
