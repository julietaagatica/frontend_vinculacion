import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  subirArchivo(form: any) {
    console.log(form.value);
  }

}
