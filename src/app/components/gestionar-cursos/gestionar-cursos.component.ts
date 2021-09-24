import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notyf } from 'notyf';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-gestionar-cursos',
  templateUrl: './gestionar-cursos.component.html'
})
export class GestionarCursosComponent implements OnInit {

  agregarCursoForm: FormGroup;
  modificarCursoForm: FormGroup;
  agregarMateriaForm: FormGroup;
  modificarMateriaForm: FormGroup;
  submitted = false;
  submittedModif = false;
  submittedMateria = false;
  submittedModifMateria = false;
  
  gestion: string = "";
  tipoGestion: string = "";

  idCarreraSeleccionada: string = "";
  carreras: any[] = [];

  idOrientacionSeleccionada: string = "";
  orientaciones: any[] = [];

  cursos: any[] = [];
  idCursoSeleccionado: string = "";
  cursoSeleccionado: any; 

  carrerasOrientaciones: any[] = [];
  idCarreraOrientacionSeleccionada: string = "";

  materias: any[] = [];
  idMateriaSeleccionada: string = "";
  materiaSeleccionada: any;

  loading: boolean = false;
  loading2: boolean = false;
  loadingCurso: boolean = false;
  loadingMaterias: boolean = false;
  loadingMateria: boolean = false;

  notyf: Notyf;

  constructor(private bibliotecaDigital: BibliotecaDigitalService, private fb: FormBuilder) { 
    this.crearFormularioParaAgregar();
    this.crearFormularioParaModificar();
    this.crearFormularioParaModificarMateria();
    this.crearFormularioParaAgregarMateria();

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
    this.idCarreraOrientacionSeleccionada = id;
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
    this.idCarreraOrientacionSeleccionada = id;
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
    this.bibliotecaDigital.getCurso(id)
      .subscribe((data: any) => {
        this.cursoSeleccionado = data;
        this.crearFormularioParaModificar();
        this.loadingCurso = false;
      })
  }

  buscarMateriasDeCurso(id: string){
    this.loadingMaterias = true;
    if(this.gestion=="orientaciones") {
      this.bibliotecaDigital.getMateriasPorCursoOrientacion(id)
      .subscribe((data: any) => {
        this.materias = data;
        this.loadingMaterias = false;
      })
    } else {
      this.bibliotecaDigital.getMateriasPorCursoCarrera(id)
      .subscribe((data: any) => {
        this.materias = data;
        this.loadingMaterias = false;
      })
    }
    
  }

  buscarMateria(id: string){
    this.loadingMateria = true;
    this.bibliotecaDigital.getMateria(id)
      .subscribe((data: any) => {
        this.materiaSeleccionada = data;
        this.crearFormularioParaModificarMateria();
        this.loadingMateria = false;
      })
  }

  seleccionarCurso(id:string){
    this.idCursoSeleccionado = id;
    this.buscarCurso(id);
    this.buscarMateriasDeCurso(id);
  }

  seleccionarMateria(id:string){
    this.idMateriaSeleccionada = id;
    this.buscarMateria(id);
  }

  crearFormularioParaAgregar() {
    this.agregarCursoForm = this.fb.group({
      nombre: ['', Validators.required],
      carreraOrientacion: ['', Validators.required],
      nbreMat: ['', Validators.required],
      profesor: ['', Validators.required],
    });
  }

  crearFormularioParaModificar() {
    this.modificarCursoForm = this.fb.group({
      nombreCur: [this.cursoSeleccionado ? this.cursoSeleccionado.nombre : '', Validators.required]
    });
  }

  crearFormularioParaAgregarMateria() {
    this.agregarMateriaForm = this.fb.group({
      nombreMat: ['', Validators.required],
      profesorMat: ['', Validators.required],
    });
  }

  crearFormularioParaModificarMateria() {
    this.modificarMateriaForm = this.fb.group({
      nombreMat2: [this.materiaSeleccionada ? this.materiaSeleccionada.nombre : '', Validators.required],
      profesorMat2: [this.materiaSeleccionada ? this.materiaSeleccionada.profesor_responsable : '', Validators.required],
    });
  }

  get f() { return this.agregarCursoForm.controls; }

  get f2() { return this.modificarCursoForm.controls; }
  
  get f3() { return this.agregarMateriaForm.controls; }

  get f4() { return this.modificarMateriaForm.controls; }

  onReset() {
    this.submitted = false;
    this.agregarCursoForm.reset();
  }

  onResetMateria() {
    this.submittedMateria = false;
    this.agregarMateriaForm.reset();
  }

  onResetModif() {
    this.submittedModif = false;
  }

  onResetModifMateria() {
    this.submittedModifMateria = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.agregarCursoForm.valid) {
      var curso = {};
      var materia = {};
  
      materia["nombre"] = this.agregarCursoForm.value["nbreMat"]
      materia["profesor_responsable"] = this.agregarCursoForm.value["profesor"]

      curso["nombre"] = this.agregarCursoForm.value["nombre"]
      curso["materias"] = [materia]

      var carreraOrientacionID: string = this.agregarCursoForm.value["carreraOrientacion"]
      
      this.bibliotecaDigital.postCurso(curso, carreraOrientacionID, this.gestion).subscribe(
        data => {
          this.notyf.success("El curso se agregó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al agregar curso");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onReset();
    }
  }

  onSubmitModif() {
    this.submittedModif = true;

    if (this.modificarCursoForm.valid) {
      var curso = {};

      curso["nombre"] = this.modificarCursoForm.value["nombreCur"]
      
      this.bibliotecaDigital.putCurso(this.idCursoSeleccionado, curso).subscribe(
        data => {
          this.notyf.success("El curso se modificó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al modificar curso");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onResetModif();
    }
  }

  eliminarCurso() {
    this.bibliotecaDigital.deleteCurso(this.idCursoSeleccionado).subscribe(
      () => {
        this.notyf.success("El curso se eliminó correctamente");
        setTimeout( () => { location.reload(true); }, 1000 );
      },
      error => {
        this.notyf.error("Hubo un error al eliminar curso");
        setTimeout( () => { location.reload(true); }, 1000 );
      }
    );
  }

  onSubmitMateria() {
    this.submittedMateria = true;

    if (this.agregarMateriaForm.valid) {
      var materia = {};
  
      materia["nombre"] = this.agregarMateriaForm.value["nombreMat"]
      materia["profesor_responsable"] = this.agregarMateriaForm.value["profesorMat"]
      
      this.bibliotecaDigital.postMateria(materia, this.idCursoSeleccionado, this.idCarreraOrientacionSeleccionada, this.gestion).subscribe(
        data => {
          this.notyf.success("La materia se agregó correctamente");
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al agregar materia");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onResetMateria();
    }
  }

  onSubmitModifMateria() {
    this.submittedModifMateria = true;

    if (this.modificarMateriaForm.valid) {
      var materia = {};
  
      materia["nombre"] = this.modificarMateriaForm.value["nombreMat2"]
      materia["profesor_responsable"] = this.modificarMateriaForm.value["profesorMat2"]
      
      this.bibliotecaDigital.putMateria(this.idMateriaSeleccionada, materia).subscribe(
        data => {
          this.notyf.success("La materia se modificó correctamente. ID: "+ data.id);
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al modificar materia");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onResetMateria();
    }
  }

  eliminarMateria() {
    this.bibliotecaDigital.deleteMateria(this.idMateriaSeleccionada).subscribe(
      () => {
        this.notyf.success("La materia se eliminó correctamente");
        setTimeout( () => { location.reload(true); }, 1000 );
      },
      error => {
        this.notyf.error("Hubo un error al eliminar materia");
        setTimeout( () => { location.reload(true); }, 1000 );
      }
    );
  }

}
