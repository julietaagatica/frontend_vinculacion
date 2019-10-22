import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html'
})
export class DocumentoComponent {
  
  documento: any;
  documentoURL: string
  loading: boolean;
  
  constructor(private router: ActivatedRoute, private bibliotecaDigital: BibliotecaDigitalService) { 
    this.router.params.subscribe( params => {
      this.getDocumento(params['id']);
      this.getURLDocumento(params['id']);
    })
  }

  getDocumento(idDocumento: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumento(idDocumento)
        .subscribe( documento => {
          this.documento = documento;
          this.loading = false;
        })
  }

  getURLDocumento(idDocumento: number) {
    this.documentoURL = encodeURIComponent(this.bibliotecaDigital.getURLDocumento(idDocumento)) + "&embedded=true";
    console.log(this.documentoURL);
  }

}
