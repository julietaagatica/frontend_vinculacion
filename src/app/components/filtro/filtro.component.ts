import { Component, Output, EventEmitter } from '@angular/core';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html'
})
export class FiltroComponent {

  tipoFiltro: string = "none"; 
  instituciones: any[] = [];
  facultades: any[] = [];
  escuelas: any[] = [];
  universidades: any[] = [];
  orientaciones: any[] = [];
  carreras: any[] = [];
  materias: any[] = [];
  cursos: any[] = [];
  institucion: string;
  loading: boolean;
  loadingFiltro: boolean = true;
  facultadSelect: string;

  @Output() getDocumentos = new EventEmitter();

  constructor(private bibliotecaDigital: BibliotecaDigitalService) { 
  }

  obtenerListaInstituciones() {
    this.bibliotecaDigital.getInstituciones()
      .subscribe( instituciones => {
        this.instituciones = instituciones;
      })
    console.log(this.instituciones);
  }

  buscarPorAutor(termino: string) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorAutor(termino)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorFacultad() {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorFacultad(this.facultadSelect)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorCategoria(termino: string) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorCategoria(termino)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorEscuela(escuela: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorEscuela(escuela)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorUniversidad(universidad: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorUniversidad(universidad)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorOrientacion(orientacion: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorOrientacion(orientacion)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorMateria(materia: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorMateria(materia)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorCurso(curso: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorCurso(curso)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorCarrera(carrera: number) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPorCarrera(carrera)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  filtrarPorInstitucion() {
    this.loading = true;
    this.bibliotecaDigital.filtrarDocumentosPorInstitucion(this.institucion)
      .subscribe(documentos => {
        this.getDocumentos.emit(documentos);
        this.loading = false;
      })
  }

  cambioFiltro() {
    this.loadingFiltro = true;
    switch (this.tipoFiltro) {
      case "facultad":
        this.bibliotecaDigital.getFacultades()
          .subscribe((data: any) => {
            this.facultades = data;
            this.loadingFiltro = false;
          })
        break;
      case "escuela":
        this.bibliotecaDigital.getEscuelas()
          .subscribe((data: any) => {
            this.escuelas = data;
            this.loadingFiltro = false;
          })
        break;
      case "universidad":
        this.bibliotecaDigital.getUniversidades()
          .subscribe((data: any) => {
            this.universidades = data;
            this.loadingFiltro = false;
          })
        break;
      case "orientacion":
        this.bibliotecaDigital.getOrientaciones()
          .subscribe((data: any) => {
            this.orientaciones = data;
            this.loadingFiltro = false;
          })
        break;
      case "carrera":
        this.bibliotecaDigital.getCarreras()
          .subscribe((data: any) => {
            this.carreras = data;
            this.loadingFiltro = false;
          })
        break;
      case "curso": 
        this.bibliotecaDigital.getCursos()
          .subscribe((data: any) => {
            this.cursos = data;
            this.loadingFiltro = false;
        })
        break;
      case "materia":
        this.bibliotecaDigital.getMaterias()
          .subscribe((data: any) => {
            this.materias = data;
            this.loadingFiltro = false;
          })
        break;
    }
  }
}
