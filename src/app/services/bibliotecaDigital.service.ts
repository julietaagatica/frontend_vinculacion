import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BibliotecaDigitalService {

  constructor(private http: HttpClient) { }

  getHost( query: string ){
    const url = `http://localhost:3000/${query}`;
    
    return this.http.get(url);
  }

  getDocumentosAcademicos( termino: string ){
    const documentos = this.getHost(`documentos_educativos/busqueda_nombre?nombre_documento=${ termino }`);
    return documentos
  }
  
  /* getNewReleases() {

    return this.getQuery('browse/new-releases?limit=20')
           .pipe(map(data => data['albums'].items));
  
  }

  getArtistas( termino: string ){
    
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
          .pipe(map(data => data['artists'].items));
  }

  getArtista( id: string ){
    
    return this.getQuery(`artists/${ id }`);
          //.pipe(map(data => data['artists'].items));
  }

  getTopTracks( id: string ){
    
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
          .pipe(map(data => data['tracks']));
  } */
}
