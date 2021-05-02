import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { MesaAyudaComponent } from "./components/mesa-ayuda/mesa-ayuda.component";
import { BibliotecaDigitalComponent } from "./components/biblioteca-digital/biblioteca-digital.component";
import { EspacioInstitucionalComponent } from "./components/espacio-institucional/espacio-institucional.component";
import { DocumentoComponent } from "./components/documento/documento.component";
import { LoginComponent } from "./components/login/login.component";
import { GestionInstitucionalComponent } from "./components/gestion-institucional/gestion-institucional.component";

export const ROUTES: Routes = [
  { path: "login", component: LoginComponent },
  { path: "app/home", component: AppComponent },
  { path: "home", component: HomeComponent },
  { path: "mesa_ayuda", component: MesaAyudaComponent },
  { path: "biblioteca_digital", component: BibliotecaDigitalComponent },
  { path: "documento/:id", component: DocumentoComponent },
  { path: "espacio_institucional", component: EspacioInstitucionalComponent },
  { path: "gestion_institucional", component: GestionInstitucionalComponent },
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "**", pathMatch: "full", redirectTo: "home" },
];
