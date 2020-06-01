import { Component, OnInit, ViewChild, Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/service/server.service';

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
  usuarioModal:string;
  DescripcionReporte:string ='';
  NombreReporte:string ='';
  formData = new FormData();
  archivo: string;
  estatus = false;
  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  public ajaxSettings: object = {
        url: this.hostUrl + 'api/FileManager/FileOperations',
        getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
        downloadUrl: this.hostUrl + 'api/FileManager/Download'
  }; 

  constructor(    
    private routeActive: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private server: ServerService
  ) { }

  ngOnInit(): void {
    this.getDataFromSource();
    this.getDataFromSourceR();
    this.getDataFromSourceIn();

    this.server.getDataProyect(this.routeActive.snapshot.params.id).subscribe((data) => {

      this.nameProject = data['data']['name'];
      this.descripcionProyecto = data['data']['description'];
    });
  }

  route(){
    this.modalService.dismissAll();
    this.router.navigateByUrl('newObject/'+this.routeActive.snapshot.params.id);
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

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }

  Agregar(){
    
    this.modalService.dismissAll();
  }

  finds(id){

  }

  Delet(id){

  }

  getDataFromSource() {
    
    this.Usuarios = [];
    this.server.getProyectTarget(this.routeActive.snapshot.params.id).subscribe((data) => {

      for(let i = 0; i < data['list'].length; i++){
        
        //console.log(data['list'][i]['tags']);
        this.Usuarios.push({
          Img:'assets/img/default-avatar.png',
          'name': data['list'][i]['name'],
          'targets': data['list'][i]['targets'],
          'tag': data['list'][i]['tags'],
          'id': data['list'][i]['_id'],
          'Path': '/dataObject/' +  data['list'][i]['_id']

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





  getDataFromSourceR() {

    this.Reportes =[
      {
        Id: 1,
        Nombre: 'reporte 1',
        Descripcion: 'descripcion 1',
        Subio: 'benito',
        Descargas: 1,
        'documento': 'assets/img/videoframe.png'
      },{
        Id: 2,
        Nombre: 'reporte 2',
        Descripcion: 'descripcion 2',
        Subio: 'benito',
        Descargas: 2,
        'documento': 'assets/img/videoframe.png'
      },
      {
        Id: 3,
        Nombre: 'reporte 3',
        Descripcion: 'descripcion 3',
        Subio: 'jose',
        Descargas: 3,
        'documento': 'assets/img/videoframe.png'
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

    var estencion = event[0].name.split('.', 2)
    this.archivo = this.NombreReporte+'.'+estencion[1];

    if (event) {  
      this.estatus =true; 
      this.formData.delete('archivo');
      this.formData.append('archivo', event[0]);
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
    if(this.files.length > 0)
      this.estatus = true;
    else
      this.estatus =false;

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