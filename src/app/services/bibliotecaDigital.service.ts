import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BibliotecaDigitalService {

  host = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  getHost( query: string ){
    const url = this.host + `/${query}`;
    
    return this.http.get(url);
  }

  deleteHost(query: string) {
    const url = this.host + `/${query}`;

    return this.http.delete(url);
  }

  getDocumentosAcademicosPorNombre( termino: string ){
    const documentos = this.getHost(`documentos_educativos/busqueda?nombre=${ termino}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorAutor(termino: string) {
    const documentos = this.getHost(`documentos_educativos/busqueda?autor=${ termino}`).pipe(map(data => data["documentos"]));
    return documentos;
  } 

  getDocumentosAcademicosPorFacultad(facultad: string) {
    const documentos = this.getHost(`documentos_educativos/busqueda?facultad=${ facultad}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorCategoria(termino: string) {
    const documentos = this.getHost(`documentos_educativos/busqueda?categoria=${ termino}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorEscuela(escuela: number) {
    const documentos = this.getHost(`documentos_educativos/busqueda?escuela=${ escuela}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorUniversidad(universidad: number) {
    const documentos = this.getHost(`documentos_educativos/busqueda?universidad=${ universidad}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorOrientacion(orientacion: number) {
    const documentos = this.getHost(`documentos_educativos/busqueda?orientacion=${ orientacion}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorMateria(materia: number) {
    const documentos = this.getHost(`documentos_educativos/busqueda?materia=${ materia}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorCurso(curso: number) {
    const documentos = this.getHost(`documentos_educativos/busqueda?curso=${ curso}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getDocumentosAcademicosPorCarrera(carrera: number) {
    const documentos = this.getHost(`documentos_educativos/busqueda?carrera=${ carrera}`).pipe(map(data => data["documentos"]));
    return documentos;
  }
  
  getDocumentos(offset: number) {
    const documentos = this.getHost(`documentos_educativos/obtener_todos?offset=${ offset }&limit=100`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getURLDocumento(idDocumento: number) {
    return this.host + `/documentos_educativos/obtener_url_documento/${idDocumento}`;
  }

  getDocumento(id: number) {
    const documento = this.getHost(`documentos_educativos/obtener_documento/${ id }`);
    return documento;
  }

  eliminarDocumento(id: number) {
    return this.http.delete(this.host + `/documentos_educativos/eliminar/${id}`);
  }

  getInstituciones() {
    const instituciones = this.getHost(`instituciones_educativas`).pipe(map(data => data["instituciones"]));
    return instituciones;
  }

  filtrarDocumentosPorInstitucion(institucion: string) {
    const documentos = this.getHost(`documentos_educativos/busqueda?universidad=${institucion}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

  getFacultades() {
    return this.getHost(`facultades`);
  }

  getOrientaciones() {
    return this.getHost(`orientaciones`);
  }

  getUniversidades() {
    return this.getHost(`instituciones_educativas/universidades`);
  }

  getEscuelas() {
    return this.getHost(`instituciones_educativas/escuelas`);
  }

  getCarreras() {
    return this.getHost(`carreras`);
  }

  getCursos() {
    return this.getHost(`cursos`);
  }

  getMaterias() {
    return this.getHost(`materias`);
  }

  subirDocumento() {
    
  }
}
