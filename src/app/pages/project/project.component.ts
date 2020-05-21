import { Component, OnInit, ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
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
  columnas: string[] = ['proyecto', 'acciones'];
  
  ngOnInit(): void {
    this.getDataFromSource();
  }

  finds(id){

  }

  Agregar(){

  }

  Delet(id){

  }

  openLg(content){
    
  }

  getDataFromSource() {
    this.Proyectos = [{
      id:1,
      nombre:'nose',
      Path: '/project/1'
    }];
    this.dataSource = new MatTableDataSource(this.Proyectos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 
}
