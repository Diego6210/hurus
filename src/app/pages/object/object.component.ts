import { Component, OnInit, ViewChild  } from '@angular/core';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


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
  columnas: string[] = ['Img', 'Nombre', 'Tags', 'Acciones'];

  usuarioModal:string;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private server: ServerService
  ) { }

  ngOnInit(): void {
    this.getDataFromSource();
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});    
  }

  route(){
    this.modalService.dismissAll();
    this.router.navigateByUrl('newObject/');
  }

  finds(id){

  }

  getDataFromSource() {
    
    this.server.getTarget().subscribe((data) => {

      for(let i = 0; i < data['list'].length; i++){
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

}
