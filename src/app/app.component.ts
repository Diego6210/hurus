import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';
import { ServerSocketService } from './service/server-socket.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit{
  title = environment.nombreAplicacion;

  constructor(
    private serverSocket: ServerSocketService
  ){

  }

  ngOnInit(){

  }
}
