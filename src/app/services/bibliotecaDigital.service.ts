import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { throwError } from 'rxjs';

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

  getDocumentosAcademicosPor(filtro: string, termino: any, nbreDoc: string) {
    var queryParams = `${filtro}=${termino}`
    if (nbreDoc != "") {
      queryParams = `${queryParams}&nombre=${nbreDoc}`
    }
    console.log("query: ", queryParams);
    const documentos = this.getHost(`documentos_educativos/busqueda?${queryParams}`).pipe(map(data => data["documentos"]));
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

  getInstitucion(id:string) {
    const institucion = this.getHost(`instituciones_educativas/${ id }`);
    return institucion;
  }

  postInstitucion(institucion:any){
    return this.http.post<any>(this.host+"/instituciones_educativas", institucion)
  }

  putInstitucion(id:string,institucion:any){
    console.log("institucion ",institucion)
    return this.http.put<any>(this.host+`/instituciones_educativas/${id}`, institucion)
  }

  deleteInstitucion(id:string){
    return this.http.delete(this.host+`/instituciones_educativas/${id}`)
  }

  getFacultades() {
    return this.getHost(`facultades`);
  }

  getOrientaciones() {
    return this.getHost(`orientaciones`);
  }

  getOrientacionesPorEscuela(escuela: string) {
    return this.getHost(`instituciones_educativas/escuelas/${escuela}/orientaciones`);
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

  getCarrerasPorUniversidad(universidadID: string) {
    return this.getHost(`instituciones_educativas/universidades/${universidadID}/carreras`);
  }


  getCursos() {
    return this.getHost(`cursos`);
  }

  getCursosPorOrientacion(orientacion:string) {
    return this.getHost(`orientaciones/${orientacion}/cursos`);
  }

  getCursosPorCarrera(carrera:string) {
    return this.getHost(`carreras/${carrera}/cursos`);
  }

  getMaterias() {
    return this.getHost(`materias`);
  }

  getMateriasPorCursoOrientacion(curso:string) {
    return this.getHost(`/orientaciones/cursos/${curso}/materias`);
  }

  getMateriasPorCursoCarrera(curso:string) {
    return this.getHost(`/carreras/cursos/${curso}/materias`);
  }

  subirDocumento(nbreDoc: string, descripcion:string, categorias: string,materias:string,autores:string, documento:File) {
    var formData = new FormData();
    formData.append("nombre_documento", nbreDoc);
    formData.append("descripcion", descripcion);
    formData.append("categorias", categorias);
    formData.append("materias", materias);
    formData.append("autores", autores);
    formData.append("documento_educativo", documento);

    var request = new XMLHttpRequest();
    request.open("POST", this.host+"/documentos_educativos/subir");
    request.send(formData);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
