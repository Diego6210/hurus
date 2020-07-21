import { Component, OnInit, ViewChild, Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServerService } from 'src/app/service/server.service';
import { debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-data-project',
  templateUrl: './data-project.component.html',
  styleUrls: ['./data-project.component.scss']
})
export class DataProjectComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('object', { static: true }) paginatorObject: MatPaginator;
  @ViewChild('report', { static: true }) paginatorReport: MatPaginator;
  @ViewChild('involucrado', { static: true }) paginatorInvolucrado: MatPaginator;
  
  dataSource = null;
  dataSourceR = null;
  dataSourceIn = null;

  private url: string = environment.server;
  keyword = 'name';
  data = [];
  Usuarios: any = [];
  columnas: string[] = ['Img', 'Nombre', 'Tags', 'Acciones'];

  Reportes: any = [];
  columnasR: string[] = ['Nombre', 'Descripcion', 'Subio', 'Descargas', 'Acciones'];

  Involucrados: any = [];
  columnasIn: string[] = ['Nombre', 'Conexion', 'Movimiento', 'Acciones'];

  Usuario = [];
  id = 0;
  idUsuario;

  nameProject: string;
  descripcionProyecto: string;
  usuariosModal: string;

  tagsModal: string;
  nombreModal: string;
  usuarioModal: string;
  DescripcionReporte: string = '';
  NombreReporte: string = '';
  formData = new FormData();
  archivo;
  estatus = false;
  proyect:string;
  urlServer:string = environment.server;
  private URL: string = environment.server;

  constructor(
    private http: HttpClient,
    private routeActive: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private server: ServerService,
    private localStorange: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getDataFromSource();
    this.getDataFromSourceR();
    this.getDataFromSourceIn();

    this.server.getDataProyect(this.routeActive.snapshot.params.id).subscribe((data) => {

      this.nameProject = data['data']['name'];
      this.descripcionProyecto = data['data']['description'];
    });

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {

        let  foto = `${this.URL}img/profile/${data['list'][i]['_id']}.jpg`; 
            
          this.data.push({
            'id': data['list'][i]['_id'],
            'Img': `${this.URL}img/profile/${data['list'][i]['_id']}.jpg`,
            'name': data['list'][i]['name']
          });
      }
    });

    this.proyect = this.routeActive.snapshot.params.id;
  }

  route(tipo) {
    this.modalService.dismissAll();
    if (tipo == 'web')
      this.router.navigateByUrl('newObjectWeb/' + this.routeActive.snapshot.params.id);
    else
      this.router.navigateByUrl('newObject/' + this.routeActive.snapshot.params.id);
  }

  capturar() {
    this.idUsuario = this.id;
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

  }

  openModaltags(tags) {
    this.modalService.open(tags, { ariaLabelledBy: 'modal-basic-title' });
  }

  AgregarTags() {

    this.modalService.dismissAll();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  Agregar() {

    this.modalService.dismissAll();
  }

  finds(id) {
        
    this.server.getReportFile(id).subscribe(
      (response: Blob) => {        

        const blob = new Blob([response], {type: 'application/pdf'});
        const filename = 'report.pdf';
        saveAs(blob,filename);

      }); 
  }

  Delet(id) {

  }

  getDataFromSource() {

    this.Usuarios = [];
    this.server.getProyectTarget(this.routeActive.snapshot.params.id).subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {
        var foto = 'assets/img/default-avatar.png';
        foto = `${this.URL}img/profile/${data['list'][i]['_id']}.jpg`;
        let router = '/dataObject/';
        if (data['list'][i]['web'])
          router = '/dataObjectWeb/';
          
        this.Usuarios.push({
          'tipo': data['list'][i]['web'],
          'Img': `${this.URL}img/profile/${data['list'][i]['_id']}.jpg`,
          'name': data['list'][i]['name'],
          'targets': data['list'][i]['targets'],
          'tag': data['list'][i]['tags'][0]['tag'],
          'tagColor': data['list'][i]['tags'][0]['tagcolor'],
          'id': data['list'][i]['_id'],
          'Path': router + data['list'][i]['_id']

        });
        this.dataSource = new MatTableDataSource(this.Usuarios);
        this.dataSource.paginator = this.paginatorObject;
        this.dataSource.sort = this.sort;
      }
    });


  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }





  getDataFromSourceR() {
    this.Reportes = [];

    this.server.getReport(this.routeActive.snapshot.params.id).subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {
        this.Reportes.push({
          'Id': data['list'][i]['_id'],
          'Nombre': data['list'][i]['name'],
          'Descripcion': data['list'][i]['descripcion'],
          'Subio': data['list'][i]['reporter'],
          'Descargas': 0,
          'documento': data['list'][i]['_id']
        });
      }

      this.dataSourceR = new MatTableDataSource(this.Reportes);
      this.dataSourceR.paginator = this.paginatorReport;
      this.dataSourceR.sort = this.sort;
    });
  }

  filtrarR(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceR.filter = filtro.trim().toLowerCase();
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






  getDataFromSourceIn() {

    this.Involucrados = [
      {
        Id: 1,
        Img: '/assets/img/mike.jpg',
        Nombre: 'Diego',
        Movimiento: 'subir reporte',
        Conexion: '12/12/2012'
      }
    ];

    this.dataSourceIn = new MatTableDataSource(this.Involucrados);
    this.dataSourceIn.paginator = this.paginatorInvolucrado;
    this.dataSourceIn.sort = this.sort;
  }

  filtrarIn(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceIn.filter = filtro.trim().toLowerCase();
  }


  files: any = [];
  uploadedFiles: Array<File>;
  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }

    //this.uploadedFiles = event;
    if (event) {
      this.estatus = true;
      this.uploadedFiles = event;
    }
  }

  subirReporte() {
    
      const httpOptions = {
        headers: new HttpHeaders({ 
          'Authorization': `Bearer ${this.localStorange.getStorage('token')}`,
          'Accept': 'application/json'
        })
      };

      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("archivo", this.uploadedFiles[i], this.uploadedFiles[i].name);
        formData.append("descripcion",this.DescripcionReporte );
        formData.append("name", this.NombreReporte);
        formData.append("reporter", '0');
        formData.append("proyect", this.routeActive.snapshot.params.id);
        formData.append("token", this.localStorange.getStorage('token'));
      }

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text:'Espere por favor...'
      });Swal.showLoading();

      this.http.post(`${this.urlServer}report/add`, formData, httpOptions)
          .subscribe((response) => {
            Swal.close();
            this.getDataFromSourceR();
          },
          error => {
            Swal.close();
            Swal.fire({
              icon: 'error',
              text: 'Algo ocurrio'
            });
            this.getDataFromSourceR()
          });
  }

  deleteAttachment(index) {
    this.files.splice(index, 1)
    if (this.files.length > 0)
      this.estatus = true;
    else
      this.estatus = false;

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

  selectEvent(item) {
    alert(item)
  }

  dataInvolucrado = [
    {
      id: 1,
      name: 'Alabama',
      img: '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
    }
  ];

  selectEventInvolucrado(item) {
    alert(item)
  }
}