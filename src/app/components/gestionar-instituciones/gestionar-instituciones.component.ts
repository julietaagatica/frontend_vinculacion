import { Component, OnInit } from '@angular/core';
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-gestionar-instituciones',
  templateUrl: './gestionar-instituciones.component.html'
})
export class GestionarInstitucionesComponent implements OnInit {

  agregarInstForm: FormGroup;
  modificarInstForm: FormGroup;
  submitted = false;
  submittedModif = false;

  instituciones: any[] = [];
  loading: boolean;
  idInstitucionSeleccionada: string = "";
  institucionSeleccionada: any;

  constructor(private bibliotecaDigital: BibliotecaDigitalService, private fb: FormBuilder) {
    this.loading = true;
    this.buscarInstituciones();
    this.crearFormularioParaAgregar();
    this.crearFormularioParaModificar();
  }

  ngOnInit() {
      
  }

  crearFormularioParaAgregar() {
    this.agregarInstForm = this.fb.group({
      nombre: ['', Validators.required],
      tipoInst: ['escuela', Validators.required],
      historia: ['', Validators.required],
      mision: ['', Validators.required],
      vision: ['', Validators.required],
    });
  }

  crearFormularioParaModificar() {
    this.modificarInstForm = this.fb.group({
      nombreInst: [this.institucionSeleccionada ? this.institucionSeleccionada.nombre : '', Validators.required],
      historiaInst: [this.institucionSeleccionada ? this.institucionSeleccionada.historia : '', Validators.required],
      misionInst: [this.institucionSeleccionada ? this.institucionSeleccionada.mision : '', Validators.required],
      visionInst: [this.institucionSeleccionada ? this.institucionSeleccionada.vision : '', Validators.required],
    });
  }
  
  get f() { return this.agregarInstForm.controls; }

  get f2() { return this.modificarInstForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.agregarInstForm.valid) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.agregarInstForm.value, null, 4));
      this.onReset();
    }
    
  }

  onSubmitModif() {
    this.submittedModif = true;

    if (this.modificarInstForm.valid) {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.modificarInstForm.value, null, 4));
      this.onResetModif();
    }
    
  }

  onReset() {
    this.submitted = false;
    this.agregarInstForm.reset();
  }

  onResetModif() {
    this.submittedModif = false;
  }

  seleccionarInstitucion(id:string){
    this.idInstitucionSeleccionada = id;
    this.buscarInstitucion(id);
  }

  buscarInstituciones(){
    this.loading = true;
    this.bibliotecaDigital.getInstituciones()
      .subscribe((data: any) => {
        console.log(data);
        this.instituciones = data;
        this.loading = false;
      })
  }

  buscarInstitucion(id:string){
    this.bibliotecaDigital.getInstitucion(id)
      .subscribe((data: any) => {
        console.log(data);
        this.institucionSeleccionada = data;
        this.crearFormularioParaModificar();
      })
  }
}
