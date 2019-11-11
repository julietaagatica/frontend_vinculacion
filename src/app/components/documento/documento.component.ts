import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html'
})
export class DocumentoComponent {
  
  documento: any;
  documentoURL: string
  loading: boolean;

  constructor(private router: ActivatedRoute, private bibliotecaDigital: BibliotecaDigitalService, private routerNavigate: Router) { 
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
    this.documentoURL = this.bibliotecaDigital.getURLDocumento(idDocumento);
    console.log(this.documentoURL);
  }

  eliminarDocumento(id: number) {
    this.bibliotecaDigital.eliminarDocumento(id).subscribe();
    setTimeout( () => { this.routerNavigate.navigate([ '/biblioteca_digital' ]); }, 3000 );
  }
}
