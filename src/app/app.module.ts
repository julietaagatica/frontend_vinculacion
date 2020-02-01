import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from "@angular/common/http";

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
import { LoadingComponent } from './components/shared/loading/loading.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { ImageextensionPipe } from './pipes/imageextension.pipe';
import { DocumentoComponent } from './components/documento/documento.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { SubidaDocumentoComponent } from './components/subida-documento/subida-documento.component';
import { FiltroComponent } from './components/filtro/filtro.component';
import { FormEdutecComponent } from './components/form-edutec/form-edutec.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MesaAyudaComponent,
    AulasExtendidasComponent,
    BibliotecaDigitalComponent,
    EspacioInstitucionalComponent,
    FooterComponent,
    LoadingComponent,
    TarjetasComponent,
    ImageextensionPipe,
    DocumentoComponent,
    DomseguroPipe,
    SubidaDocumentoComponent,
    FiltroComponent,
    FormEdutecComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
