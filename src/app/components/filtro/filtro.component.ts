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
  autorSelect: string;
  categoriaSelect: string;
  facultadSelect: string;
  escuelaSelect: number;
  universidadSelect: number;
  orientacionSelect: number;
  carreraSelect: number;
  materiaSelect: number;
  cursoSelect: number;

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

  limpiarBusqueda(offset: number = 0) {
    this.loading = true;
    this.bibliotecaDigital.getDocumentos(offset)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorNombre(termino: string, tipoFiltro: string) {
    this.loading = true;
    switch (tipoFiltro) {
      case "none":
        this.bibliotecaDigital.getDocumentosAcademicosPorNombre(termino)
          .subscribe((data: any) => {
            console.log(data);
            this.getDocumentos.emit(data);
            this.loading = false;
          })
        break;
      case "autor":
        this.buscarPorAutor(termino);
        break;
      case "categoria":
        this.buscarPorCategoria(termino);
        break;
      case "escuela":
        this.buscarPorEscuela(termino);
        break;
      case "universidad":
        this.buscarPorUniversidad(termino);
        break;
      case "facultad":
        this.buscarPorFacultad(termino);
        break;
      case "orientacion":
        this.buscarPorOrientacion(termino);
        break;
      case "carrera":
        this.buscarPorCarrera(termino);
        break;
      case "curso":
        this.buscarPorCurso(termino);
        break;
      case "materia":
        this.buscarPorMateria(termino);
        break;
    }
  }

  buscarPorAutor(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("autor",this.autorSelect, nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorFacultad(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("facultad",this.facultadSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorCategoria(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("categoria",this.categoriaSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorEscuela(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("escuela",this.escuelaSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorUniversidad(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("universidad",this.universidadSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorOrientacion(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("orientacion",this.orientacionSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorMateria(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("materia",this.materiaSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorCurso(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("curso",this.cursoSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
        this.loading = false;
      })
  }

  buscarPorCarrera(nbreDoc: string = "") {
    this.loading = true;
    this.bibliotecaDigital.getDocumentosAcademicosPor("carrera",this.carreraSelect,nbreDoc)
      .subscribe((data: any) => {
        console.log(data);
        this.getDocumentos.emit(data);
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
