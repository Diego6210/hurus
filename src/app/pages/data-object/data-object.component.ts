import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ServerService } from 'src/app/service/server.service';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../service/local-storage.service';
import Swal from 'sweetalert2'

declare const google: any;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: 'app-data-object',
  templateUrl: './data-object.component.html',
  styleUrls: ['./data-object.component.scss']
})
export class DataObjectComponent implements OnInit {
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

  item = [];
  IMG: string;
  formData = new FormData();
  id = 0;
  idTipoUsuario;

  Descripcion: string;
  Latitud: string;
  Longitud: string;
  dialogCorreo: string;
  dialogPassword: string;
  dialogUrl: string;
  usuarioModal: string;
  sex: string;
  estado: string;
  token: string = this.localStorange.getStorage('token');
  keyword = 'name';
  data = [];
  private URL: string = environment.server;

  public ajaxSettings: object = {
    url: `${this.URL}fileManager/${this.routeActive.snapshot.params.id}/`,
    getImageUrl: `${this.URL}fileManager/GetImage/${this.routeActive.snapshot.params.id}/`,
    uploadUrl: `${this.URL}fileManager/Upload/${this.routeActive.snapshot.params.id}/`,
    downloadUrl: `${this.URL}FileManager/Download/${this.routeActive.snapshot.params.id}/`
  };

  constructor(
    public dialog: MatDialog,
    private modalService: NgbModal,
    private routeActive: ActivatedRoute,
    private server: ServerService,
    private localStorange: LocalStorageService
  ) {

  }

  
  beforeSend(args: any){
    //args.ajaxSettings.beforeSend = function (args) { 
      //args.httpRequest.setRequestHeader("Authorization", "Bearer " + this.localStorange.getStorage('token')) 
    //}
  }

  ngOnInit(): void {
    this.locattionSice = this.locations.length;
    this.accountSice = this.accounts.length;
    this.contactSice = this.contacts.length;

    this.server.getDataTargetFind(this.routeActive.snapshot.params.id).subscribe((data) => {

      if (data['sex'])
        this.sex = 'Femenino';
      else
        this.sex = 'Masculino';

      if (data['civil_state'])
        this.estado = 'Casado';
      else
        this.estado = 'Soltero';

      this.Empresa = data['bussines'];
      this.fecha = data['date'];
      this.Nombre = data['name'];
//      this.imgdefault = 'data:image/jpg;base64,' + data['img']; 
      this.imgdefault = `${this.URL}img/profile/${data['_id']}.jpg`; 
      //this.imgdefault = `${this.URL}img/profile/${data['_id']}`;
      for (let i = 0; i < data['account'].length; i++) {
        this.accounts.push({
          Url: data['account'][i]['Url'],
          Correo: data['account'][i]['Correo'],
          Password: data['account'][i]['Password']
        });
      }

      for(let i = 0; i < data['targets'].length; i++){
        this.contacts.push({
          img: data['targets'][i]['img'],
          nombre:data['targets'][i]['nombre'],
          url: data['targets'][i]['perfile']
        });  
      }

      for (let i = 0; i < data['location'].length; i++) {
        this.locations.push({
          Long: data['location'][i]['Long'],
          Lat: data['location'][i]['Lat'],
          Descripcion: data['location'][i]['Descripcion']
        });
      }
      this.map();
      this.accountSice = this.accounts.length;
      this.locattionSice = this.locations.length;
      this.contactSice = this.contacts.length;
    });

    this.server.getTarget().subscribe((data) => {

      for (let i = 0; i < data['list'].length; i++) {

        var foto = 'assets/img/default-avatar.png';

        //this.server.getTargetFoto(data['list'][i]['_id']).subscribe((res) => {
          //if (res['data'] != null)
            //foto = 'data:image/jpg;base64,' + res['data']; 

          this.data.push({
            'id': data['list'][i]['_id'],
            'Img': foto,
            'name': data['list'][i]['name'],
            'web': data['list'][i]['web']
          });
       // });
      }
    });
  }

  addcontacto(){
    this.modalService.dismissAll();
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

    this.server.setTargetAccounts(this.routeActive.snapshot.params.id, this.accounts).subscribe((data) => {
      console.log(data['msg']);
    })

    this.dialogUrl = '';
    this.dialogCorreo = '';
    this.dialogPassword = '';

    this.accountSice = this.accounts.length;
    this.modalService.dismissAll();
  }

  guardarData() {
    this.server.setTargetData(this.routeActive.snapshot.params.id, this.Nombre, this.fecha, this.Empresa, this.estadoSelected, this.sexSelected).subscribe((data) => {

      Swal.fire({
        icon: 'success',
        text: 'Actualizado'
      });
    })
  }

  opendAccount(modalCuenta) {

    this.modalService.open(modalCuenta, { ariaLabelledBy: 'modal-basic-title' });
  }

  onChange($event, Archivo: FileList) {

    var estencion = Archivo[0].name.split('.', 2)
    this.IMG = this.Username + '.' + estencion[1];

    if ($event.target.files) {
      var reader = new FileReader();

      reader.onload = ($event: any) => {
        this.imgdefault = $event.target.result;
        this.server.setTargetperfil(this.routeActive.snapshot.params.id, $event.target.result).subscribe((data) => {

          Swal.fire({
            icon: 'success',
            text: 'Actualizado'
          });
        });
      }
      this.cheange = true;
      reader.readAsDataURL($event.target.files[0]);


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

    this.server.setTargetLocation(this.routeActive.snapshot.params.id, this.locations).subscribe((data) => {
      
      Swal.fire({
        icon: 'success',
        text: 'Actualizado'
      });
      this.map();
    });


    this.Longitud = '';
    this.Latitud = '';
    this.Descripcion = '';
    this.locattionSice = this.locations.length;
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

    this.server.setTargetContacts(this.routeActive.snapshot.params.id, this.contacts).subscribe((data) => {
      /*Swal.fire({
        icon: 'success',
        text: 'Agregado'
      });*/
    })

    this.contactSice = this.contacts.length;

  }


  map() {
    //console.log(this.locations)
    var lng = 0;
    var lat = 0;
    if (this.locations.length > 0) {
      lat = this.locations[this.locations.length - 1]['Lat'];
      lng = this.locations[this.locations.length - 1]['Long'];
    }


    var myLatlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false,
      styles: [{
        "elementType": "geometry",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#8ec3b9"
        }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1a3646"
        }]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#64779e"
        }]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#4b6878"
        }]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#334e87"
        }]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{
          "color": "#283d6a"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#6f9ba5"
        }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#3C7680"
        }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{
          "color": "#304a7d"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#98a5be"
        }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{
          "color": "#2c6675"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#9d2a80"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{
          "color": "#9d2a80"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#b0d5ce"
        }]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#023e58"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#98a5be"
        }]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [{
          "color": "#1d2c4d"
        }]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [{
          "color": "#283d6a"
        }]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{
          "color": "#3a4762"
        }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{
          "color": "#0e1626"
        }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{
          "color": "#4e6d70"
        }]
      }
      ]
    };



    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var title = 'Sin ubicación';
    if (this.locations.length > 0)
      title = 'Ultima ubicación';

    var marker = new google.maps.Marker({
      position: myLatlng,
      title: title,
      id:this.locations.length - 1
    });

    this.setMarkers(map);

    marker.setMap(map);

    google.maps.event.addListener(marker, 'click', () => {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: `Ubicación: ${this.locations[marker.id]['Descripcion']}`,
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Modificar',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          Swal.mixin({
            input: 'text',
            confirmButtonText: 'Siguiente &rarr;',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            progressSteps: ['1', '2', '3']
          }).queue([
            'Latitud',
            'Longitud',
            'Descripción'
          ]).then((result) => {
            if (result.value) {

              this.locations[marker.id]['Descripcion'] = result.value[2];
              this.locations[marker.id]['Long'] = result.value[1];
              this.locations[marker.id]['Lat'] = result.value[0];

              const answers = JSON.stringify(result.value);
              Swal.fire({
                title: 'Locacion',
                html: `<pre><code style='color:black;'>${answers}</code></pre>`,
                confirmButtonText: 'Confirmar '
              })

              this.server.setTargetLocation(this.routeActive.snapshot.params.id, this.locations).subscribe((data) => {
      
                Swal.fire({
                  icon: 'success',
                  text: 'Actualizado'
                });
                this.map();
              });
            }
          });
        } 
      })
    });
  }


  setMarkers(map) {

    var marker, i
    for (i = 0; i < this.locations.length; i++) {

      var latlngset = new google.maps.LatLng(this.locations[i]['Lat'], this.locations[i]['Long']);

      var marker = new google.maps.Marker({
        map: map, title: this.locations[i]['Descripcion'], position: latlngset, id:i
      });

      map.setCenter(marker.getPosition())

      var content = "Loan Number: " + this.locations[i]['Descripcion'] + '</h3>'

      var infowindow = new google.maps.InfoWindow()

      google.maps.event.addListener(marker, 'click', () => {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        })
        
        swalWithBootstrapButtons.fire({
          title: `Ubicación: ${this.locations[marker.id]['Descripcion']}`,
          icon: 'info',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Modificar',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            Swal.mixin({
              input: 'text',
              confirmButtonText: 'Siguiente &rarr;',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              progressSteps: ['1', '2', '3']
            }).queue([
              'Latitud',
              'Longitud',
              'Descripción'
            ]).then((result) => {
              if (result.value) {
                
                this.locations[marker.id]['Descripcion'] = result.value[2];
                this.locations[marker.id]['Long'] = result.value[1];
                this.locations[marker.id]['Lat'] = result.value[0];

                const answers = JSON.stringify(result.value);
                Swal.fire({
                  title: 'Locacion',
                  html: `<pre><code style='color:black;'>${answers}</code></pre>`,
                  confirmButtonText: 'Confirmar '
                })

                this.server.setTargetLocation(this.routeActive.snapshot.params.id, this.locations).subscribe((data) => {
        
                  Swal.fire({
                    icon: 'success',
                    text: 'Actualizado'
                  });
                  this.map();
                });
              }
            });
          } 
        })
      });

      google.maps.event.addDomListener(marker, 'click', function (map, marker) {
        infowindow.setContent(content)
        infowindow.open(map, marker)
      });
    }
  }

}
