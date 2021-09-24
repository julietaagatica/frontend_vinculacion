import { Component, OnInit } from '@angular/core';
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { Notyf } from 'notyf';

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
  
  notyf: Notyf;

  constructor(private bibliotecaDigital: BibliotecaDigitalService, private fb: FormBuilder) {
    this.loading = true;
    this.buscarInstituciones();
    this.crearFormularioParaAgregar();
    this.crearFormularioParaModificar();

    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: "center",
        y: "top",
      },
    });
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
      var institucion = {};
      institucion["nombre"] = this.agregarInstForm.value["nombre"];
      institucion["tipo_institucion"] = this.agregarInstForm.value["tipoInst"];
      institucion["historia"] = this.agregarInstForm.value["historia"];
      institucion["vision"] = this.agregarInstForm.value["vision"];
      institucion["mision"] = this.agregarInstForm.value["mision"];
      this.bibliotecaDigital.postInstitucion(institucion).subscribe(
        data => {
          this.notyf.success("La institución se agregó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al agregar institucion");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onReset();
    }
  }

  onSubmitModif() {
    this.submittedModif = true;

    if (this.modificarInstForm.valid) {
      var institucion = {};
      institucion["nombre"] = this.modificarInstForm.value["nombreInst"];
      institucion["historia"] = this.modificarInstForm.value["historiaInst"];
      institucion["vision"] = this.modificarInstForm.value["visionInst"];
      institucion["mision"] = this.modificarInstForm.value["misionInst"];
      this.bibliotecaDigital.putInstitucion(this.idInstitucionSeleccionada, institucion).subscribe(
        data => {
          this.notyf.success("La institución se modificó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al modificar institución");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onReset();
    }
    
  }

  eliminarInstitucion() {
    this.bibliotecaDigital.deleteInstitucion(this.idInstitucionSeleccionada).subscribe(
      () => {
        this.notyf.success("La institucion se eliminó correctamente");
        setTimeout( () => { location.reload(true); }, 1000 );
      },
      error => {
        this.notyf.error("Hubo un error al eliminar institución");
        setTimeout( () => { location.reload(true); }, 1000 );
      }
    );
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
