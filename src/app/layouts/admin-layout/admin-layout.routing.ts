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
import { AuthService } from 'src/app/service/auth.service';
import { NewObjectWebComponent } from 'src/app/pages/new-object-web/new-object-web.component';
import { DataObjectWebComponent } from 'src/app/pages/data-object-web/data-object-web.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate : [AuthService] },
  { path: "perfil", component: UserComponent, canActivate : [AuthService]  },
  { path: "users", component: UsersComponent, canActivate : [AuthService]  },
  { path: "object", component: ObjectComponent, canActivate : [AuthService]  },
  { path: "manifest", component: ManifestComponent, canActivate : [AuthService]  },
  { path: "newObject", component: NewObjectComponent, canActivate : [AuthService]  },
  { path: "newObjectWeb", component: NewObjectWebComponent, canActivate : [AuthService]  },
  { path: "newObject/:id", component: NewObjectComponent, canActivate : [AuthService]  },
  { path: "newObjectWeb/:id", component: NewObjectWebComponent, canActivate : [AuthService]  },
  { path: "dataObject/:id", component: DataObjectComponent, canActivate : [AuthService]  },
  { path: "dataObjectWeb/:id", component: DataObjectWebComponent, canActivate : [AuthService]  },
  { path: "project/:id", component: DataProjectComponent, canActivate : [AuthService]  },
  { path: "project", component: ProjectComponent, canActivate : [AuthService]  },
];
