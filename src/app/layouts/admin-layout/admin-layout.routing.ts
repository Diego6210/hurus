import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { UsersComponent } from 'src/app/pages/users/users.component';
import { ObjectComponent } from 'src/app/pages/object/object.component';
import { ManifestComponent } from 'src/app/pages/manifest/manifest.component';
import { NewObjectComponent } from 'src/app/pages/new-object/new-object.component';
import { DataObjectComponent } from 'src/app/pages/data-object/data-object.component';
import { ProjectComponent } from 'src/app/pages/project/project.component';
import { DataProjectComponent } from 'src/app/pages/data-project/data-project.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "perfil", component: UserComponent },
  { path: "users", component: UsersComponent },
  { path: "object", component: ObjectComponent },
  { path: "manifest", component: ManifestComponent },
  { path: "newObject", component: NewObjectComponent },
  { path: "dataObject/:id", component: DataObjectComponent },
  { path: "project/:id", component: DataProjectComponent },
  { path: "project", component: ProjectComponent },
];
