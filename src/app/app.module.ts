import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MesaAyudaComponent } from './components/mesa-ayuda/mesa-ayuda.component';
import { AulasExtendidasComponent } from './components/aulas-extendidas/aulas-extendidas.component';
import { BibliotecaDigitalComponent } from './components/biblioteca-digital/biblioteca-digital.component';
import { EspacioInstitucionalComponent } from './components/espacio-institucional/espacio-institucional.component';
import { FooterComponent } from './components/shared/footer/footer.component';

//importo rutas
import { ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MesaAyudaComponent,
    AulasExtendidasComponent,
    BibliotecaDigitalComponent,
    EspacioInstitucionalComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
