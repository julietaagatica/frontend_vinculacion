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

  constructor(private bibliotecaDigital: BibliotecaDigitalService) { 
    this.loading = true;
    this.buscarDocumentos()
  }

  buscarPorNombre(termino: string) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorNombre(termino)
      .subscribe((data: any) => {
        console.log(data);
        this.documentos = data;
        this.loading = false;
      })
  }

  buscarDocumentos(offset: number = 0) {
    this.bibliotecaDigital.getDocumentos(offset)
      .subscribe((data: any) => {
        console.log(data);
        this.documentos = data;
        this.loading = false;
      })
  }


}
