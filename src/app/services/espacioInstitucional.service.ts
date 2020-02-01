import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
  export class EspacioInstitucionalService {
  
    host = "http://localhost:9090"
  
    constructor(private http: HttpClient) { }
  
    getHost( query: string ){
      const url = this.host + `/${query}`;
      
      return this.http.get(url);
    }
  
    deleteHost(query: string) {
      const url = this.host + `/${query}`;
  
      return this.http.delete(url);
    }

    enviarFormulario( email: string, solicitante: string, institucion: string, telefono: string){
      console.log(`/espacio_institucional/enviarCorreo?email=${ email }&solicitante=${ solicitante }&institucion=${ institucion }&telefono=${ telefono }`);
     
      this.http.post(this.host + `/espacio_institucional/enviarCorreo?email=${ email }&solicitante=${ solicitante }&institucion=${ institucion }&telefono=${ telefono }`,
      {
          "email": email ,
          "solicitante": solicitante,
          "institucion": institucion,
          "telefono": telefono
      })
      .subscribe(
          (val) => {
              console.log("POST call successful value returned in body", 
                          val);
          },
          response => {
              console.log("POST call in error", response);
          },
          () => {
              console.log("The POST observable is now completed.");
          });
    }

  }    