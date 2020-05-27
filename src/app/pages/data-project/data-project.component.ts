import { Component, OnInit, ViewChild, Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-project',
  templateUrl: './data-project.component.html',
  styleUrls: ['./data-project.component.scss']
})
export class DataProjectComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  dataSourceR = null;
  dataSourceIn = null;

  private url: string = environment.server+'imagen/';
  
  Usuarios:any = [];
  columnas: string[] = ['Img', 'Nombre', 'Tags', 'Acciones'];

  Reportes:any = [];
  columnasR: string[] = ['Nombre', 'Descripcion', 'Subio', 'Descargas', 'Acciones'];

  Involucrados:any = [];
  columnasIn: string[] = ['Img', 'Nombre', 'Acciones'];
  
  Usuario=[];
  id = 0;
  idUsuario;

  nameProject:string;
  descripcionProyecto: string;

  
  tagsModal: string;
  nombreModal: string;


  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  public ajaxSettings: object = {
        url: this.hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
        downloadUrl: this.hostUrl + 'api/FileManager/Download'
  }; 

  constructor(    
    private routeActive: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getDataFromSource();
    this.getDataFromSourceR();
    this.getDataFromSourceIn();
    this.nameProject = this.routeActive.snapshot.params.id;
  }

  capturar() {
    this.idUsuario = this.id;
  }
  
  openModal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    

  }

  openModaltags(tags){
    this.modalService.open(tags, {ariaLabelledBy: 'modal-basic-title'});    
  }

  AgregarTags(){
    
    this.modalService.dismissAll();
  }

  Agregar(){
    
    this.modalService.dismissAll();
  }

  finds(id){

  }

  Delet(id){

  }

  getDataFromSource() {
    this.Usuarios = [
      {
        Img:'assets/img/mike.jpg',
        Nombre:'Diego',
        FechaNacimiento:'11-06-1912',
        Tags:'diego',
        Path: '/dataObject/1'
      },
      {
        Img:'assets/img/logo-hydra.png',
        Nombre:'julio',
        FechaNacimiento:'12-06-2000',
        Tags:'julio',
        Path: '/dataObject/2'
      },
      {
        Img:'assets/img/videoframe.png',
        Nombre:'memo',
        FechaNacimiento:'11-07-2010',
        Tags:'memo',
        Path: '/dataObject/3'
      },
      {
        Img:'assets/img/default-avatar.png',
        Nombre:'chuya',
        FechaNacimiento:'11-09-2012',
        Tags:'chuya',
        Path: '/dataObject/4'
      }
    ];
    this.dataSource = new MatTableDataSource(this.Usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  } 

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  } 





  getDataFromSourceR() {

    this.Reportes =[
      {
        Id: 1,
        Nombre: 'reporte 1',
        Descripcion: 'descripcion 1',
        Subio: 'benito',
        Descargas: 1
      },{
        Id: 2,
        Nombre: 'reporte 2',
        Descripcion: 'descripcion 2',
        Subio: 'benito',
        Descargas: 2
      },
      {
        Id: 3,
        Nombre: 'reporte 3',
        Descripcion: 'descripcion 3',
        Subio: 'jose',
        Descargas: 3
      },
    ];
    
    this.dataSourceR = new MatTableDataSource(this.Reportes);
    this.dataSourceR.paginator = this.paginator;
    this.dataSourceR.sort = this.sort;
  } 

  filtrarR(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceR.filter = filtro.trim().toLowerCase();
  } 



  




  getDataFromSourceIn() {

    this.Involucrados =[
      {
        Id: 1,
        Img:'/assets/img/mike.jpg',
        Nombre:'Diego',
      }
    ];
    
    this.dataSourceIn = new MatTableDataSource(this.Involucrados);
    this.dataSourceIn.paginator = this.paginator;
    this.dataSourceIn.sort = this.sort;
  } 

  filtrarIn(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceIn.filter = filtro.trim().toLowerCase();
  } 


  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }


  @Output() onFileDropped = new EventEmitter<any>();
	
  @HostBinding('style.background-color') private background = '#f5fcff'
  @HostBinding('style.opacity') private opacity = '1'
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8'
  }
	
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff'
    this.opacity = '1'
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files)
    }
  }
}