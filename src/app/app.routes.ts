import { Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component';
import { MesaAyudaComponent } from './components/mesa-ayuda/mesa-ayuda.component';
import { BibliotecaDigitalComponent } from './components/biblioteca-digital/biblioteca-digital.component';
import { AulasExtendidasComponent } from './components/aulas-extendidas/aulas-extendidas.component';
import { EspacioInstitucionalComponent } from './components/espacio-institucional/espacio-institucional.component';
import { DocumentoComponent } from './components/documento/documento.component';


export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'mesa_ayuda', component: MesaAyudaComponent},
    { path: 'biblioteca_digital', component: BibliotecaDigitalComponent },
    { path: 'documento/:id', component: DocumentoComponent},
    { path: 'aulas_extendidas', component: AulasExtendidasComponent},
    { path: 'espacio_institucional', component: EspacioInstitucionalComponent},
    { path: '', pathMatch: 'full', redirectTo: 'home'},
    { path: '**', pathMatch: 'full', redirectTo: 'home'},

];