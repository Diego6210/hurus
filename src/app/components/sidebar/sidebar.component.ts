import { Component, OnInit } from "@angular/core";
import { environment } from 'src/environments/environment';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: "icon-chart-pie-36",
    class: "",
  },/*
  {
    path: "/users",
    title: "Usuarios",
    icon: "icon-single-02",
    class: "",
  },*/
  {
    path: "/project",
    title: "Proyectos",
    icon: "icon-atom",
    class: "",
  },
  {
    path: "/object",
    title: "Objetivos",
    icon: "icon-single-02",
    class: "",
  },
  {
    path: "/tareas",
    title: "Tareas",
    icon: "icon-paper",
    class: "",
  },
  {
    path: "/manifest",
    title: "Manifiesto",
    icon: "icon-world",
    class: "",
  }
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  
  menuItems: any[];  
  nombreAplicacion:string;

  constructor(
  ) {}

  ngOnInit() {
    this.nombreAplicacion = environment.nombreAplicacion;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
