import { Component, OnInit } from '@angular/core';
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";
import { User } from "src/app/models/user.model";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-biblioteca-digital',
  templateUrl: './biblioteca-digital.component.html',
  providers: [StorageService],
})
export class BibliotecaDigitalComponent implements OnInit {
  usuario: User;

  documentos: any[] = [];
  loading: boolean;
  subirDoc: boolean;
  filtro: boolean;
  

  constructor(private bibliotecaDigital: BibliotecaDigitalService, private storageService: StorageService){ 
    this.loading = true;
    this.buscarDocumentos()
  }

  ngOnInit() {
    this.usuario = this.storageService.getCurrentUser();
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
