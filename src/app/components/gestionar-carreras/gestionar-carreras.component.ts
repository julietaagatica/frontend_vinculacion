import { Component, OnInit } from '@angular/core';
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-gestionar-carreras',
  templateUrl: './gestionar-carreras.component.html'
})
export class GestionarCarrerasComponent implements OnInit {

  agregarCarreraForm: FormGroup;
  modificarCarreraForm: FormGroup;
  submitted = false;
  submittedModif = false;

  carreras: any[] = [];
  universidades: any[] = [];
  loading: boolean;
  loadingCarrera: boolean;
  loadingUniversidades: boolean;
  idCarreraSeleccionada: string = "";
  carreraSeleccionada: any;
  universidadSelect: string = "";

  notyf: Notyf;
  constructor(private bibliotecaDigital: BibliotecaDigitalService, private fb: FormBuilder) {
    this.loading = true;
    this.buscarCarreras();
    this.crearFormularioParaAgregar();
    this.crearFormularioParaModificar();
    this.buscarUniversidades();

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

  filtrarPorUniversidad(){
    this.bibliotecaDigital.getCarrerasPorUniversidad(this.universidadSelect)
      .subscribe((data: any) => {
        this.carreras = data;
      });
  }

  crearFormularioParaAgregar() {
    this.agregarCarreraForm = this.fb.group({
      nombre: ['', Validators.required],
      facultad: ['', Validators.required],
      duracion: ['', Validators.required],
      universidad: ['', Validators.required]
    });
  }

  crearFormularioParaModificar() {
    this.modificarCarreraForm = this.fb.group({
      nombreCarr: [this.carreraSeleccionada ? this.carreraSeleccionada.nombre : '', Validators.required],
      facultadCarr: [this.carreraSeleccionada ? this.carreraSeleccionada.facultad : '', Validators.required],
      duracionCarr: [this.carreraSeleccionada ? this.carreraSeleccionada.duracion : '', Validators.required]
    });
  }
  
  get f() { return this.agregarCarreraForm.controls; }

  get f2() { return this.modificarCarreraForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.agregarCarreraForm.valid) {
      var carrera = {};
      carrera["nombre"] = this.agregarCarreraForm.value["nombre"]
      carrera["facultad"] = this.agregarCarreraForm.value["facultad"]
      carrera["duracion"] = Number(this.agregarCarreraForm.value["duracion"])
      carrera["id_universidad"] = Number(this.agregarCarreraForm.value["universidad"])
      this.bibliotecaDigital.postCarrera(carrera).subscribe(
        data => {
          this.notyf.success("La carrera se agregó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al agregar la carrera");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onReset();
    }
  }

  onSubmitModif() {
    this.submittedModif = true;

    if (this.modificarCarreraForm.valid) {
      var carrera = {};
      carrera["nombre"] = this.modificarCarreraForm.value["nombreCarr"]
      carrera["facultad"] = this.modificarCarreraForm.value["facultadCarr"]
      carrera["duracion"] = Number(this.modificarCarreraForm.value["duracionCarr"])
      this.bibliotecaDigital.putCarrera(this.idCarreraSeleccionada, carrera).subscribe(
        data => {
          this.notyf.success("La carrera se modificó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al modificar la carrera");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onReset();
    }
    
  }

  eliminarCarrera() {
    this.bibliotecaDigital.deleteCarrera(this.idCarreraSeleccionada).subscribe(
      () => {
        this.notyf.success("La carrera se elminó correctamente");
        setTimeout( () => { location.reload(true); }, 1000 );
      },
      error => {
        this.notyf.error("Hubo un error al eliminar la carrera");
        setTimeout( () => { location.reload(true); }, 1000 );
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.agregarCarreraForm.reset();
  }

  onResetModif() {
    this.submittedModif = false;
  }

  seleccionarCarrera(id:string){
    this.idCarreraSeleccionada = id;
    this.buscarCarrera(id);
  }

  buscarCarreras(){
    this.loading = true;
    this.bibliotecaDigital.getCarreras()
      .subscribe((data: any) => {
        this.carreras = data;
        this.loading = false;
      })
  }

  buscarCarrera(id:string){
    this.loadingCarrera = true;
    this.bibliotecaDigital.getCarrera(id)
      .subscribe((data: any) => {
        console.log(data)
        this.carreraSeleccionada = data;
        this.crearFormularioParaModificar();
        this.loadingCarrera = false;
      })
  }

  buscarUniversidades(){
    this.loadingUniversidades = true;
    this.bibliotecaDigital.getUniversidades()
      .subscribe((data: any) => {
        this.universidades = data;
        this.loadingUniversidades = false;
      })
  }

}
