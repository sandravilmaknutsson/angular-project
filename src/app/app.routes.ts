import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { SchemaComponent } from './schema/schema.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "table", component: TableComponent },
    { path: "schema", component: SchemaComponent },
    { path: "", redirectTo: "home", pathMatch: "full" }
];
