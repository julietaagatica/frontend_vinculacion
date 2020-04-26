import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-subida-documento',
  templateUrl: './subida-documento.component.html',
  styles: []
})
export class SubidaDocumentoComponent implements OnInit {
  public subirForm: FormGroup;
  public escuelas: any[];
  public orientaciones: any[];
  public cursos: any[];
  public materias: any[];
  public universidades: any[];
  public carreras: any[];
  public autoresSelect: string[] = [];
  public archivoSubir: File;

  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaDigitalService: BibliotecaDigitalService
  ) { }

  ngOnInit() {
    this.agregarEscuelas();
    this.obtaingPageDataFromRoute();
  }

  private obtaingPageDataFromRoute() {
    this.subirForm = this.formBuilder.group({
      nombreDoc: ['', [Validators.required]],
      descripcion: ['', [Validators.nullValidator]],
      categorias: ['', [Validators.required]],
      tipoInst: ['escuela'],
      institucion: ['', [Validators.required]],
      ramaInst: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      materia: ['', [Validators.required]],
      nombreAut: ['', [Validators.required]],
      apellidoAut: ['', [Validators.required]],
      archivo: ['', [Validators.required]]
    });
  }

  agregarEscuelas() {
    this.bibliotecaDigitalService.getEscuelas()
      .subscribe((data: any) => {
        this.escuelas = data;
      });
  }

  agregarOrientaciones(escuelaID: string) {
    this.bibliotecaDigitalService.getOrientacionesPorEscuela(escuelaID)
      .subscribe((data: any) => {
        this.orientaciones = data
      });
  }

  agregarCursosOrientacion(ramaID: string) {
    this.bibliotecaDigitalService.getCursosPorOrientacion(ramaID)
      .subscribe((data: any) => {
       this.cursos = data
      });
  }

  agregarMateriasCursoOrientacion(cursoID: string) {
    this.bibliotecaDigitalService.getMateriasPorCursoOrientacion(cursoID)
      .subscribe((data: any) => {
        this.materias = data;
      });
  }

  agregarUniversidades() {
    this.bibliotecaDigitalService.getUniversidades()
      .subscribe((data: any) => {
        this.universidades = data;
      });
  }

  agregarCarreras(universidadID: string) {
    this.bibliotecaDigitalService.getCarrerasPorUniversidad(universidadID)
      .subscribe((data: any) => {
        this.carreras = data;
      });
  }

  agregarCursosCarrera(ramaID: string) {
    this.bibliotecaDigitalService.getCursosPorCarrera(ramaID)
      .subscribe((data: any) => {
        this.cursos = data;
      });
  }

  agregarMateriasCursoCarrera(cursoID: string) {
    this.bibliotecaDigitalService.getMateriasPorCursoCarrera(cursoID)
      .subscribe((data: any) => {
        this.materias = data;
      });
  }

  addAutor(nombre: string, apellido: string) {
    this.autoresSelect.push(nombre + "," + apellido);
  }

  eliminarAutor(autor: string) {
    const index = this.autoresSelect.indexOf(autor);
    if (index > -1) {
      this.autoresSelect.splice(index, 1);
    } 
  }

  onFileChange(input) {
    this.archivoSubir = input.files[0];

    console.log('este es mi archivo:', this.archivoSubir);
  }

  get tipoInst() { return this.subirForm.get('tipoInst').value }
  set tipoInst(tipo: string) { this.subirForm.setValue(["tipoInst", tipo]) }
  get nombreDoc() { return this.subirForm.get('nombreDoc').value }
  get categorias() { return this.subirForm.get('categorias').value }
  get descripcion() { return this.subirForm.get('descripcion').value }
  get materia() { return this.subirForm.get('materia').value }

  
  onReset() {
    this.subirForm.reset();
    this.subirForm.setValue(["tipoInst", "escuela"]);
  }

  public onSubmit(formValue: any) {
    var autoresListString = this.autoresSelect.join("-");

    this.bibliotecaDigitalService.subirDocumento(this.nombreDoc, this.descripcion, this.categorias, this.materia, autoresListString, this.archivoSubir);
    
    this.onReset();
  }

}
