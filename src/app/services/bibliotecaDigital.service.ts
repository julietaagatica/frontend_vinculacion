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

  getOrientacion(id:string){
    return this.getHost(`orientaciones/${id}`);
  }

  postOrientacion(orientacion:any) {
    return this.http.post<any>(this.host+"/orientaciones", orientacion)
  }

  putOrientacion(id:string,orientacion:any){
    return this.http.put<any>(this.host+`/orientaciones/${id}`, orientacion)
  }

  deleteOrientacion(id:string){
    return this.http.delete(this.host+`/orientaciones/${id}`)
  }

  getOrientacionesPorEscuela(escuela: string) {
    return this.getHost(`escuelas/${escuela}/orientaciones`);
  }

  getUniversidades() {
    return this.getHost(`universidades`);
  }

  getEscuelas() {
    return this.getHost(`escuelas`);
  }

  getCarreras() {
    return this.getHost(`carreras`);
  }

  getCarrera(id:string){
    return this.getHost(`carreras/${id}`);
  }

  postCarrera(carrera:any) {
    return this.http.post<any>(this.host+"/carreras", carrera)
  }

  putCarrera(id:string,carrera:any){
    return this.http.put<any>(this.host+`/carreras/${id}`, carrera)
  }

  deleteCarrera(id:string){
    return this.http.delete(this.host+`/carreras/${id}`)
  }

  getCarrerasPorUniversidad(universidadID: string) {
    return this.getHost(`universidades/${universidadID}/carreras`);
  }

  getCurso(id:string) {
    return this.getHost(`cursos/${id}`);
  }

  getCursos() {
    return this.getHost(`cursos`);
  }

  postCurso(curso:any, carreraOrientacionID: string, gestion: string) {
    var url = this.host+"/" + gestion + "/"+ carreraOrientacionID + "/cursos"
    return this.http.post<any>(url, curso)
  }

  putCurso(id:string,curso:any){
    return this.http.
    put<any>(this.host+`/cursos/${id}`, curso)
  }

  deleteCurso(id:string){
    return this.http.delete(this.host+`/cursos/${id}`)
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

  getMateria(id:string) {
    return this.getHost(`materias/${id}`);
  }

  postMateria(materia:any, cursoID: string, carreraOrientacionID: string, gestion: string) {
    var url = this.host+"/" + gestion + "/"+ carreraOrientacionID + "/cursos/" + cursoID + "/materias"
    console.log("URL: ", url, " body: ", materia)
    return this.http.post<any>(url, materia)
  }

  putMateria(id:string,materia:any){
    return this.http.
    put<any>(this.host+`/materias/${id}`, materia)
  }

  deleteMateria(id:string){
    return this.http.delete(this.host+`/materias/${id}`)
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

    /*var request = new XMLHttpRequest();
    request.open("POST", this.host+"/documentos_educativos/subir");
    request.send(formData);*/
    
    return this.http.post<any>(this.host+"/documentos_educativos/subir", formData);
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
