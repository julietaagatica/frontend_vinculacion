import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notyf } from 'notyf';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-gestionar-orientaciones',
  templateUrl: './gestionar-orientaciones.component.html'
})
export class GestionarOrientacionesComponent implements OnInit {

  agregarOrientacionForm: FormGroup;
  modificarOrientacionForm: FormGroup;
  submitted = false;
  submittedModif = false;

  orientaciones: any[] = [];
  escuelas: any[] = [];
  loading: boolean;
  loadingOrientacion: boolean;
  idOrientacionSeleccionada: string = "";
  orientacionSeleccionada: any;
  escuelaSelect: string;

  notyf: Notyf;

  constructor(private bibliotecaDigital: BibliotecaDigitalService, private fb: FormBuilder) {
    this.loading = true;
    this.buscarOrientaciones();
    this.crearFormularioParaAgregar();
    this.crearFormularioParaModificar();
    this.buscarEscuelas();

    this.notyf = new Notyf({
      duration: 3000,
      position: {
        x: "center",
        y: "top",
      },
    });
  }

  ngOnInit() {}

  filtrarPorEscuela(){
    this.bibliotecaDigital.getOrientacionesPorEscuela(this.escuelaSelect)
      .subscribe((data: any) => {
        this.orientaciones = data;
      });
  }

  crearFormularioParaAgregar() {
    this.agregarOrientacionForm = this.fb.group({
      nombre: ['', Validators.required],
      escuela: ['', Validators.required]
    });
  }

  crearFormularioParaModificar() {
    this.modificarOrientacionForm = this.fb.group({
      nombreOr: [this.orientacionSeleccionada ? this.orientacionSeleccionada.nombre : '', Validators.required]
    });
  }
  
  get f() { return this.agregarOrientacionForm.controls; }

  get f2() { return this.modificarOrientacionForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.agregarOrientacionForm.valid) {
      var orientacion = {};
      orientacion["nombre"] = this.agregarOrientacionForm.value["nombre"]
      orientacion["id_escuela_secundaria"] = Number(this.agregarOrientacionForm.value["escuela"])
      this.bibliotecaDigital.postOrientacion(orientacion).subscribe(data => {
        this.notyf.success("La orientación se agregó correctamente. ID: "+ data.id);
        setTimeout( () => { location.reload(true); }, 500 );
      })
      this.onReset();
    }
  }

  onSubmitModif() {
    this.submittedModif = true;

    if (this.modificarOrientacionForm.valid) {
      var orientacion = {};
      orientacion["nombre"] = this.modificarOrientacionForm.value["nombreOr"]
      this.bibliotecaDigital.putOrientacion(this.idOrientacionSeleccionada, orientacion).subscribe(data => {
        this.notyf.success("La orientación se modificó correctamente. ID: "+ data.id);
        setTimeout( () => { location.reload(true); }, 500 );
      })
      this.onReset();
    }
    
  }

  eliminarOrientacion() {
    this.bibliotecaDigital.deleteOrientacion(this.idOrientacionSeleccionada).subscribe(() => {
      this.notyf.success("La orientación se eliminó correctamente.");
      setTimeout( () => { location.reload(true); }, 500 );
    });
  }

  onReset() {
    this.submitted = false;
    this.agregarOrientacionForm.reset();
  }

  onResetModif() {
    this.submittedModif = false;
  }

  seleccionarOrientacion(id:string){
    this.idOrientacionSeleccionada = id;
    this.buscarOrientacion(id);
  }

  buscarOrientaciones(){
    this.loading = true;
    this.bibliotecaDigital.getOrientaciones()
      .subscribe((data: any) => {
        this.orientaciones = data;
        this.loading = false;
      })
  }

  buscarOrientacion(id:string){
    this.loadingOrientacion = true;
    this.bibliotecaDigital.getOrientacion(id)
      .subscribe((data: any) => {
        console.log(data)
        this.orientacionSeleccionada = data;
        this.crearFormularioParaModificar();
        this.loadingOrientacion = false;
      })
  }

  buscarEscuelas(){
    this.loading = true;
    this.bibliotecaDigital.getEscuelas()
      .subscribe((data: any) => {
        this.escuelas = data;
        this.loading = false;
      })
  }


}
