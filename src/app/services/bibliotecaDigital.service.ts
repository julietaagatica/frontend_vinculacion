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
    const documentos = this.getHost(`documentos_educativos/busqueda_nombre?parametro=${ termino}`).pipe(map(data => data["documentos"]));
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
    const documentos = this.getHost(`documentos_educativos/busqueda_institucion?parametro=${institucion}`).pipe(map(data => data["documentos"]));
    return documentos;
  }

}
