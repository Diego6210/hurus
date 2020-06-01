import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private url: string = environment.server + 'imagen/';
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = null;

  Usuarios = [];
  TipoUsuario = [];
  id = 0;
  idTipoUsuario;

  Usuario: string;
  Apellidos: string;
  Nombre: string;
  Email: string;
  Password: string;


  TituloModal: string = 'Agregar Usuario';
  TipoModal: boolean = true;
  columnas: string[] = ['img', 'Usuario', 'Email', 'nombre', 'apellido', 'acciones'];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private server: ServerService
  ) { }


  openLg(content) {
    this.TituloModal = 'Agregar Usuario';
    this.TipoModal = true;

    this.modalService.open(content, { size: 'lg' });
  }

  Agregar(from, align) {
  }


  Delet(idUser) {
    Swal.fire({
      title: 'Desea eliminar el usuario?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.value) {

      }
    })
  }

  getTipoUsuarios() {

  }

  Edits(idUser, content) {
    this.TituloModal = 'Editar Usuario';
    this.TipoModal = false;
    this.modalService.open(content, { size: 'lg' });

  }

  ngOnInit(): void {
  }

  capturar() {
    this.idTipoUsuario = this.id;
  }

  getDataFromSource() {

    this.dataSource = new MatTableDataSource(this.Usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

}
