import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { LoginComponent } from './pages/login/login.component';
import { WebcamModule } from 'ngx-webcam';
import { BrowserModule } from '@angular/platform-browser';
import { UsersComponent } from './pages/users/users.component';

import { DataTablesModule } from 'angular-datatables';
import { ServerService } from './service/server.service';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { Page404Component } from './pages/page404/page404.component';
import { ManifestComponent } from './pages/manifest/manifest.component';
import { ObjectComponent } from './pages/object/object.component';
import { ProjectComponent } from './pages/project/project.component';
import { DataObjectComponent } from './pages/data-object/data-object.component';
import { NewObjectComponent } from './pages/new-object/new-object.component';
import { MatButtonModule } from '@angular/material/button';
import { FileManagerAllModule } from '@syncfusion/ej2-angular-filemanager';
import { DataProjectComponent } from './pages/data-project/data-project.component';

@NgModule({

  entryComponents:[],
  imports: [
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    WebcamModule,
    DataTablesModule,
    FileManagerAllModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, UsersComponent, Page404Component, ManifestComponent, ObjectComponent, ProjectComponent, DataObjectComponent, NewObjectComponent, DataProjectComponent],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
