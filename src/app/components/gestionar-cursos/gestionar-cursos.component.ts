import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-gestionar-cursos',
  templateUrl: './gestionar-cursos.component.html'
})
export class GestionarCursosComponent implements OnInit {

  agregarCursoForm: FormGroup;
  modificarCursoForm: FormGroup;
  agregarMateriasForm: FormGroup;
  submitted = false;
  submittedModif = false;
  submittedMaterias = false;
  
  gestion: string = "";
  tipoGestion: string = "";
  idCarreraSeleccionada: string = "";
  carreras: any[] = [];
  idOrientacionSeleccionada: string = "";
  orientaciones: any[] = [];
  loading: boolean = false;
  loading2: boolean = false;
  loadingCurso: boolean = false;
  cursos: any[] = [];
  idCursoSeleccionado: string = "";
  cursoSeleccionado: any; 
  carrerasOrientaciones: any[] = [];

  constructor(private bibliotecaDigital: BibliotecaDigitalService, private fb: FormBuilder) { 
    this.crearFormularioParaAgregar();
    this.crearFormularioParaModificar();
    this.crearFormularioParaAgregarMaterias();
  }

  ngOnInit() {
  }

  gestionar(tipoGestion: string){
    this.gestion=tipoGestion;
    if(tipoGestion=="carreras"){
      this.buscarCarreras();
      this.tipoGestion = "Carrera"
    } else {
      this.buscarOrientaciones();
      this.tipoGestion = "Orientación"
    }
  }

  seleccionarCarrera(id:string){
    this.idCarreraSeleccionada = id;
    this.buscarCursos();
  }

  buscarCarreras(){
    this.loading = true;
    this.bibliotecaDigital.getCarreras()
      .subscribe((data: any) => {
        this.carreras = data;
        this.carrerasOrientaciones = data;
        this.loading = false;
      })
  }

  seleccionarOrientacion(id:string){
    this.idOrientacionSeleccionada = id;
    this.buscarCursos();
  }

  buscarOrientaciones(){
    this.loading = true;
    this.bibliotecaDigital.getOrientaciones()
      .subscribe((data: any) => {
        this.orientaciones = data;
        this.carrerasOrientaciones = data;
        this.loading = false;
      })
  }

  buscarCursos(){
    this.loading2 = true;
    if(this.gestion == "orientaciones") {
      this.bibliotecaDigital.getCursosPorOrientacion(this.idOrientacionSeleccionada)
      .subscribe((data: any) => {
        this.cursos = data;
        this.loading2 = false;
      })
    } else {
      this.bibliotecaDigital.getCursosPorCarrera(this.idCarreraSeleccionada)
      .subscribe((data: any) => {
        this.cursos = data;
        this.loading2 = false;
      })
    }    
  }

  buscarCurso(id: string){
    this.loadingCurso = true;
    this.bibliotecaDigital.getCarrera(id) //CAMBIAR POR GET CURSO
      .subscribe((data: any) => {
        console.log(data)
        this.cursoSeleccionado = data;
        this.crearFormularioParaModificar();
        this.loadingCurso = false;
      })
  }

  seleccionarCurso(id:string){
    this.idCursoSeleccionado = id;
    this.buscarCurso(id);
  }

  crearFormularioParaAgregar() {
    this.agregarCursoForm = this.fb.group({
      nombre: ['', Validators.required],
      carreraOrientacion: ['', Validators.required],
    });
  }

  crearFormularioParaModificar() {
    this.modificarCursoForm = this.fb.group({
      nombreCur: [this.cursoSeleccionado ? this.cursoSeleccionado.nombre : '', Validators.required]
    });
  }

  crearFormularioParaAgregarMaterias() {
    this.modificarCursoForm = this.fb.group({
      nombreCur: [this.cursoSeleccionado ? this.cursoSeleccionado.nombre : '', Validators.required]
    });
  }
}
