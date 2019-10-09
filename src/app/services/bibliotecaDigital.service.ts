import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BibliotecaDigitalService {

  constructor(private http: HttpClient) { }

  getHost( query: string ){
    const url = `https://localhost:8000/${ query }`;

    /* const headers = new HttpHeaders({
      'Authorization': 'Bearer QAcjybaqpBLBTha8p7Nw2oWPrDu2Kx3quBiaAuUPqwp3v5xpMAcu_bl3XQvhggZakR6oyZrYmfwnFpkCttu-QyBsrabFjM4HfUdWSmofJCosFv5WU3wBJ-wnVRay9Z_XLVO3trMCAGSYv6Ywuc'
    });
 */
    return this.http.get(url);
  }

  getDocumentosAcademicos( termino: string ){
    const documentos = this.getHost(`/documentos-academicos?nombre_documento=${ termino }`);
    console.log(documentos);
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
