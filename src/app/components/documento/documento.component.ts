import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";
import { User } from "src/app/models/user.model";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  providers: [StorageService],
})
export class DocumentoComponent implements OnInit {
  usuario: User;
  documento: any;
  documentoURL: string
  loading: boolean;

  constructor(private router: ActivatedRoute, private bibliotecaDigital: BibliotecaDigitalService, private routerNavigate: Router, private storageService: StorageService) { 
    this.router.params.subscribe( params => {
      this.getDocumento(params['id']);
      this.getURLDocumento(params['id']);
    })

  }

  ngOnInit() {
    this.usuario = this.storageService.getCurrentUser();
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
  }

  eliminarDocumento(id: number) {
    this.bibliotecaDigital.eliminarDocumento(id).subscribe(
      (data) => {
        alert("El documento se eliminó correctamente.");
        setTimeout( () => { this.routerNavigate.navigate([ '/biblioteca_digital' ]); }, 3000 );
      }
    );
  }
}
