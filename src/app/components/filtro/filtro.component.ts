import { Component, Output, EventEmitter } from '@angular/core';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html'
})
export class FiltroComponent {

  tipoFiltro: string = "none"; 
  instituciones: any[] = [];
  institucion: string;
  loading: boolean;
  orientaciones: any[] = [];

  @Output() getDocumentos = new EventEmitter();

  constructor(private bibliotecaDigital: BibliotecaDigitalService) { 
    this.obtenerListaInstituciones();
  }

  obtenerListaInstituciones() {
    this.bibliotecaDigital.getInstituciones()
      .subscribe( instituciones => {
        this.instituciones = instituciones;
      })
    console.log(this.instituciones);
  }

  filtrarPorInstitucion() {
    this.loading = true;
    this.bibliotecaDigital.filtrarDocumentosPorInstitucion(this.institucion)
      .subscribe(documentos => {
        this.getDocumentos.emit(documentos);
        this.loading = false;
      })
  }
}
