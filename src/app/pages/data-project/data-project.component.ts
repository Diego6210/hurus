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
const statesWithFlags: { name: string, flag: string }[] = [
  { 'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png' },
  { 'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png' }
];
@Component({
  selector: 'app-data-project',
  templateUrl: './data-project.component.html',
  styleUrls: ['./data-project.component.scss']
})
export class DataProjectComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;
  dataSourceR = null;
  dataSourceIn = null;

  private url: string = environment.server + 'imagen/';

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

  constructor(
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
  }

  searchUsuario = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: { name: string }) => x.name;


  route() {
    this.modalService.dismissAll();
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

  }

  Delet(id) {

  }

  getDataFromSource() {

    this.Usuarios = [];
    this.server.getProyectTarget(this.routeActive.snapshot.params.id).subscribe((data) => {

      console.log(data);
      for (let i = 0; i < data['list'].length; i++) {
        var foto = 'assets/img/default-avatar.png';

        this.server.getTargetFoto(data['list'][i]['_id']).subscribe((res) => {
          console.log(res['data']);
          if (res['data'] != null)
            foto = 'data:image/jpg;base64,' + res['data'];
          this.Usuarios.push({
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





  getDataFromSourceR() {

    let url = environment.server;

    this.Reportes = [];

    this.server.getReport(this.routeActive.snapshot.params.id).subscribe((data) => {

      console.log(data)
      for (let i = 0; i < data['list'].length; i++) {
        this.Reportes.push({
          'Id': data['list'][i]['_id'],
          'Nombre': data['list'][i]['name'],
          'Descripcion': data['list'][i]['descripcion'],
          'Subio': 'beni',//data['list'][i]['_id'],
          'Descargas': data['list'][i]['reporter'],
          'documento': `${url}report/file/${data['list'][i]['_id']}/?=${this.localStorange.getStorage('token')}`
        });
      }

      this.dataSourceR = new MatTableDataSource(this.Reportes);
      this.dataSourceR.paginator = this.paginator;
      this.dataSourceR.sort = this.sort;
    });
  }

  filtrarR(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSourceR.filter = filtro.trim().toLowerCase();
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

    if (event) {
      this.estatus = true;
      var reader = new FileReader();
      reader.onload = ($event: any) => {
        this.archivo = $event.target.result;
      }
    }
  }

  subirReporte() {
    this.server.uploadReport(this.archivo, this.DescripcionReporte, this.NombreReporte, this.routeActive.snapshot.params.id).subscribe((data) => {
      this.files = [];
      this.estatus = false;
      this.DescripcionReporte = '';
      this.NombreReporte = '';
      this.getDataFromSourceR();
      if (!data['err']) {
        Swal.fire({
          icon: 'success',
          text: data['message']
        });
      }
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
}