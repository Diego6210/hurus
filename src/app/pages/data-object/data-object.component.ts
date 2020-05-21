import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';

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
  locations:any = [];

  accountSice: number = 0;
  accounts:any = [];

  contactSice:number = 0;
  contacts:any = [];

  Nombre:string;

  Descripcion:string;
  Latitud:string;
  Longitud:string;
  dialogCorreo:string;
  dialogPassword:string;
  dialogUrl:string;
  //public hostUrl: string = 'https://127.0.0.1:8090';
  //public hostUrl: string = 'https://ej2services.syncfusion.com/production/web-services/';

  /*public ajaxSettings: object = {
        url: this.hostUrl + '/',
        getImageUrl: this.hostUrl + '/GetImage/',
        uploadUrl: this.hostUrl + '/Upload/',
        downloadUrl: this.hostUrl + '/Download/'
  };*/ 

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
    this.map();
    
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


  map(){
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
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

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
  }

}
