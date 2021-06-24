import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

declare var jQuery:any;
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  host = "http://localhost:9090"

  constructor(private http: HttpClient) { }

  getHost(query: string) {
    const url = this.host + `/${query}`;

    return this.http.get(url);
  }

  enviarFormulario(email: string, solicitante: string, institucion: string, telefono: string) {
    console.log(`/enviar_correo?email=${email}&solicitante=${solicitante}&institucion=${institucion}&telefono=${telefono}`);

    this.http.post(this.host + `/enviar_correo?email=${email}&solicitante=${solicitante}&institucion=${institucion}&telefono=${telefono}`,
      {
        "email": email,
        "solicitante": solicitante,
        "institucion": institucion,
        "telefono": telefono
      })
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body", val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  enviarEmailDeContacto(emailData: any) {
    return this.http.post(this.host + `/enviar_correo_contacto`, emailData);
  }


  getPreguntaFrecuente(id: string) {
    return this.getHost(`preguntas_frecuentes_unsl/${id}`);
  }

  obtenerPreguntasFrecuentes() {
    return this.getHost("preguntas_frecuentes_unsl");
  }

  eliminarPreguntaFrecuente(idFaq: string) {
    return this.http.delete(this.host + `/preguntas_frecuentes_unsl/${idFaq}`);
  }

  agregarNuevaPregunta(pregunta: string, respuesta: string) {
    console.log(pregunta, respuesta);
    return this.http.post(this.host + `/preguntas_frecuentes_unsl`,
      {
        "pregunta": pregunta,
        "respuesta":respuesta,
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
        }
      );
  }

  modificarPreguntaFrecuente(id:string,pregunta: string, respuesta: string) {
    return this.http.put(this.host + `/preguntas_frecuentes_unsl/${id}`,
      {
        "pregunta": pregunta,
        "respuesta":respuesta,
      })
      .subscribe(
        (val) => {
          console.log("PUT call successful value returned in body",
            val);
        },
        response => {
          console.log("PUT call in error", response);
        },
        () => {
          console.log("The PUT observable is now completed.");
        }
      );
  }

}    