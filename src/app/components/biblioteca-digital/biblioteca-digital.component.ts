import { Component, OnInit } from '@angular/core';
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";

@Component({
  selector: 'app-biblioteca-digital',
  templateUrl: './biblioteca-digital.component.html',
  styles: []
})
export class BibliotecaDigitalComponent{

  documentos: any[] = [];
  loading: boolean;
  subirDoc: boolean;
  filtro: boolean;
  

  constructor(private bibliotecaDigital: BibliotecaDigitalService) { 
    this.loading = true;
    this.buscarDocumentos()
  }

  buscarDocumentos(offset: number = 0) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentos(offset)
      .subscribe((data: any) => {
        console.log(data);
        this.documentos = data;
        this.loading = false;
      })
  }

  filtrar() {
    this.filtro = !this.filtro;
  }

  subir() {
    this.subirDoc = !this.subirDoc;
  }

  filtrarDocumentos(e) {
    this.documentos = e;
  }
}
