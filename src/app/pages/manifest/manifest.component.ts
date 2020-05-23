import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.scss']
})
export class ManifestComponent implements OnInit {

  nombreAplicacion:string;

  constructor() { }

  ngOnInit(): void {
    this.nombreAplicacion = environment.nombreAplicacion;
  }

}
