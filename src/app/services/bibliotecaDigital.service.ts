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

  getDocumentosAcademicosPorNombre( termino: string ){
    const documentos = this.getHost(`documentos_educativos/busqueda_nombre?nombre_documento=${ termino }`).pipe(map(data => data["documentos"]));
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

}
