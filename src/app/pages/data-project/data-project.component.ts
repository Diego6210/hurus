import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data-project',
  templateUrl: './data-project.component.html',
  styleUrls: ['./data-project.component.scss']
})
export class DataProjectComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  private url: string = environment.server+'imagen/';
  
  Usuarios:any = [];
  columnas: string[] = ['Img', 'Nombre', 'FechaNacimiento','Tags', 'Acciones'];

  nameProject:string;

  constructor(    
    private routeActive: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDataFromSource();

    this.nameProject = this.routeActive.snapshot.params.id;
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