import { Component, OnInit } from '@angular/core';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-subida-documento',
  templateUrl: './subida-documento.component.html',
  styles: []
})
export class SubidaDocumentoComponent implements OnInit {

  nombre: string;
  categoria: string;
  descripcion: string;
  archivo: File;
  tipoInstitucion: string = "";

  escuelas: string[] = [
    "escuela 1",
    "escuela 2",
    "escuela 3",
    "escuela 4",
    "escuela 5",
    "escuela 6"
  ]
  
  universidades: string[] = [
    "universidad 1",
    "universidad 2",
    "universidad 3",
    "universidad 4",
    "universidad 5",
    "universidad 6"
  ]

  changeTypeInstitution (event: any) {
    this.tipoInstitucion = event.target.value
    // if(this.tipoInstitucion == "escuela"){
    //   BibliotecaDigitalService.getEscuelas();
    // } else {
    //   BibliotecaDigitalService.getUniversidades();
    // }
  }

  constructor() { }

  ngOnInit() {
  }

  subirArchivo(form: any) {
    console.log(form.value);
  }

  obtenerInstituciones() {
    
  }

}
