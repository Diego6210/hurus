import { Component, OnInit } from "@angular/core";
import { ServerService } from 'src/app/service/server.service';
import Swal from 'sweetalert2'

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  constructor(    
    private server:ServerService
  ) {
  
  }

  imgdefault: string = '';
  cheange = false;
  Username:string;
  Apellidos:string;
  Nombre:string;
  Email:string;
  Password:string;

  IMG:string;
  formData = new FormData();
  TipoUsuario=[];
  id = 0;
  idTipoUsuario;

  ngOnInit() {
  }

  getUsuario(){
  }

  getTipoUsuarios(){
    
  }

  GuardarCambios(){
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
    this.server.uploadFile(this.formData,this.Username).subscribe((data) =>{ console.log(data)});
    this.cheange = false;
  }  
}