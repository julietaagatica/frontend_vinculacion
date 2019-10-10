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

  }

  buscar(termino: string) {
    this.loading = true;
    console.log("llego por aca");
    this.bibliotecaDigital.getDocumentosAcademicos(termino)
      .subscribe((data: any) => {
        console.log(data);
        this.documentos = data;
        this.loading = false;
      })
  }

}
