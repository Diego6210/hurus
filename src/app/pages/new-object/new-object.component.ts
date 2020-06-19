import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-object',
  templateUrl: './new-object.component.html',
  styleUrls: ['./new-object.component.scss']
})
export class NewObjectComponent implements OnInit {

  locattionSice: number = 0;
  locations: any = [];

  accountSice: number = 0;
  accounts: any = [];

  contactSice: number = 0;
  contacts: any = [];

  Nombre: string;
  fecha: Date;
  Empresa: string;
  sexSelected;
  estadoSelected;

  Username: string;
  imgdefault: string = 'assets/img/default-avatar.png';
  cheange = false;

  IMG: string;
  formData = new FormData();
  id = 0;
  idTipoUsuario;
  item = [];
  Descripcion: string;
  Latitud: string;
  Longitud: string;
  dialogCorreo: string;
  dialogPassword: string;
  dialogUrl: string;
  tags = [];
  idProyect: string;

  usuarioModal: string;

  public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';
  public ajaxSettings: object = {
    url: this.hostUrl + 'api/FileManager/FileOperations',
    getImageUrl: this.hostUrl + 'api/FileManager/GetImage',
    uploadUrl: this.hostUrl + 'api/FileManager/Upload',
    downloadUrl: this.hostUrl + 'api/FileManager/Download'
  };

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private routeActive: ActivatedRoute,
    private server: ServerService,
    private router:Router
  ) {

  }

  keyword = 'name';

  data = [];

  ngOnInit(): void {
    this.locattionSice = this.locations.length;
    this.accountSice = this.accounts.length;
    this.contactSice = this.contacts.length;
    if (this.routeActive.snapshot.params.id != undefined) {
      this.idProyect = this.routeActive.snapshot.params.id;
      this.server.getDataProyect(this.routeActive.snapshot.params.id).subscribe((data) => {
        this.tags.push({
          tag: data['data']['tag'],
          tagcolor: "#0f0f0f"
        });
      });

      console.log(this.tags)
    }

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {

        var foto = 'assets/img/default-avatar.png';

        this.server.getTargetFoto(data['list'][i]['_id']).subscribe((res) => {
          if (res['data'] != null)
            foto = 'data:image/jpg;base64,' + res['data'];

          this.data.push({
            'id': data['list'][i]['_id'],
            'Img': foto,
            'name': data['list'][i]['name'],
            'web': data['list'][i]['web']
          });
        });
      }
    });
  }

  addcontacto(){
    //this.contacts.push(this.item);
    this.modalService.dismissAll();

    //this.contactSice = this.contacts.length;
  }

  selectEvent(item) {
    let perfile = '#/dataObject/'+item['id'];
    if(item['web'])
      perfile = '#/dataObjectWeb/'+item['id'];
      
    this.contacts.push({
      img: item['Img'],
      nombre: item['name'],
      url: perfile
    });

    this.modalService.dismissAll();
    this.contactSice = this.contacts.length;
  }

  contactos(contacto) {
    this.modalService.open(contacto, { ariaLabelledBy: 'modal-basic-title' });

  }

  onItemChangeEstado(item) {

  }

  onItemChangeSex(item) {

  }

  addAccount() {

    this.accounts.push({
      Url: this.dialogUrl,
      Correo: this.dialogCorreo,
      Password: this.dialogPassword
    });
    this.dialogUrl = '';
    this.dialogCorreo = '';
    this.dialogPassword = '';

    this.accountSice = this.accounts.length;
    this.modalService.dismissAll();
  }

  opendAccount(modalCuenta) {

    this.modalService.open(modalCuenta, { ariaLabelledBy: 'modal-basic-title' });
  }

  onChange($event, Archivo: FileList) {

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event: any) => {
        this.imgdefault = $event.target.result;
      }
      this.cheange = true;
      reader.readAsDataURL($event.target.files[0]);

      this.formData.delete('archivo');
      this.formData.append('archivo', Archivo[0]);
    }
  }

  capturar() {
    this.idTipoUsuario = this.id;
  }

  onSubmit() {
    this.server.uploadFile(this.formData, this.Username).subscribe((data) => { console.log(data) });
    this.cheange = false;
  }

  addLocation() {

    this.locations.push({
      Long: this.Longitud,
      Lat: this.Latitud,
      Descripcion: this.Descripcion
    });

    this.Longitud = '';
    this.Latitud = '';
    this.Descripcion = '';
    this.locattionSice = this.locations.length;
  }


  GuardarDatos() {
    if (this.routeActive.snapshot.params.id == undefined || this.routeActive.snapshot.params.id == 'undefined' || this.routeActive.snapshot.params.id == '' || this.routeActive.snapshot.params.id == null)
      this.tags = [{ tag: "", tagcolor: "" }];

    this.server.setTargetAdd(this.Nombre, this.fecha, this.Empresa, this.estadoSelected, this.sexSelected, [this.idProyect], JSON.stringify(this.contacts), JSON.stringify(this.accounts), JSON.stringify(this.tags), JSON.stringify(this.locations), this.imgdefault, false).subscribe((data) => {

      if (!data['err']) {
        Swal.fire({
          icon: 'success',
          text: data['message']
        });
        if (this.routeActive.snapshot.params.id == undefined || this.routeActive.snapshot.params.id == 'undefined' || this.routeActive.snapshot.params.id == '' || this.routeActive.snapshot.params.id == null)
          this.router.navigateByUrl('object');
        else
          this.router.navigateByUrl('project/' + this.idProyect);
      } else {
        Swal.fire({
          icon: 'error',
          text: data['message']
        });
      }
    });
  }
}
