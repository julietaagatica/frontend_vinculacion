import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-institucional',
  templateUrl: './gestion-institucional.component.html'
})
export class GestionInstitucionalComponent implements OnInit {

  gestion: string = "instituciones";

  constructor() { }

  ngOnInit() {
  }

  gestionar(tipoGestion: string){
    this.gestion=tipoGestion;
  }

}
