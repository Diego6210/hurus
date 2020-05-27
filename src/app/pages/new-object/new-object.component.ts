import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-new-object',
  templateUrl: './new-object.component.html',
  styleUrls: ['./new-object.component.scss']
})
export class NewObjectComponent implements OnInit {

  locattionSice: number = 0;
  locations:any = [];

  accountSice: number = 0;
  accounts:any = [];

  contactSice:number = 0;
  contacts:any = [];

  Nombre:string;
  Username:string;
  imgdefault: string = 'assets/img/default-avatar.png';
  cheange = false;
  
  IMG:string;
  formData = new FormData();
  id = 0;
  idTipoUsuario;

  Descripcion:string;
  Latitud:string;
  Longitud:string;
  dialogCorreo:string;
  dialogPassword:string;
  dialogUrl:string;
  

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
    private routeActive: ActivatedRoute
  ) {    
    this.locattionSice = this.locations.length;
    this.accountSice = this.accounts.length;
    this.contactSice = this.contacts.length;
    //alert(this.routeActive.snapshot.params.id)
  }

  ngOnInit(): void {
    
    
  }

  addAccount(){

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

  opendAccount(modalCuenta){

    this.modalService.open(modalCuenta, {ariaLabelledBy: 'modal-basic-title'});    
  }

  onChange($event,Archivo: FileList){
    
    var estencion = Archivo[0].name.split('.', 2)
    this.IMG = this.Username+'.'+estencion[1];

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event:any) => {
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
    //this.server.uploadFile(this.formData,this.Username).subscribe((data) =>{ console.log(data)});
    this.cheange = false;
  }  

  addLocation(){

    this.locations.push({
      Long: this.Longitud,
      Latitude: this.Latitud,
      Descripcion: this.Descripcion
    });

    
    this.Longitud = '';
    this.Latitud = '';
    this.Descripcion = '';
    this.locattionSice = this.locations.length;
  }



}
