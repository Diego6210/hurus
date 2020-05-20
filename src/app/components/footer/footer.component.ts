import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  nombreEmpresa: string = environment.nombreEmpresa;

  constructor() {}

  ngOnInit() {}
}
