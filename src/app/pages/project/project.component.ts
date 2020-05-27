import { Component, OnInit, ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    private modalService: NgbModal
  ) {    
  }

  ngOnInit(): void {
    this.getDataFromSource();
  }

  finds(id){

  }

  Agregar(){

    this.Proyectos.push({
      id:1,
      nombre: this.nombreModal,
      descripcion: this.descripcionModal,
      tag: this.tagsModal,
      Path: '/project/2'
    });

    this.getDataFromSource();

    this.modalService.dismissAll();
  }

  Delet(id){

  }

  openLg(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    

  }

  getDataFromSource() {
    this.Proyectos = [{
      id:1,
      nombre:'nose',
      descripcion:'PROYECTO',
      tag:'tag',
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
