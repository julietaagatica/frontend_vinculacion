import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BibliotecaDigitalService } from "src/app/services/bibliotecaDigital.service";
import { Notyf } from "notyf";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-subida-documento",
  templateUrl: "./subida-documento.component.html",
  styles: [],
})
export class SubidaDocumentoComponent implements OnInit {
  usuario: User;
  public subirForm: FormGroup;

  public escuelas: any[] = [];
  public orientaciones: any[];
  public cursos: any[];
  public materias: any[];
  public universidades: any[] = [];
  public carreras: any[];
  public autoresSelect: string[] = [];
  public archivoSubir: File;
  public tipoInstitucion: string = "Escuela";
  public institucion: any;
  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaDigitalService: BibliotecaDigitalService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.usuario = this.storageService.getCurrentUser();
    console.log(this.usuario.institucion_id);
    if (this.usuario && this.usuario.rol != "ADMIN") {
      this.obtenerInstitucion(this.usuario.institucion_id);
    } else {
      this.agregarEscuelas();
    }
    this.crearFormularioParaSubirDocumento();
  }

  obtenerInstitucion(id: string) {
    this.bibliotecaDigitalService.getInstitucion(id).subscribe((data: any) => {
      this.institucion = data;
      if (data["tipo_institucion"] == "Escuela") {
        this.escuelas.push(this.institucion);
      } else {
        this.universidades.push(this.institucion);
      }
    });
  }

  agregarEscuelas() {
    this.tipoInstitucion = "Escuela";
    this.bibliotecaDigitalService.getEscuelas().subscribe((data: any) => {
      this.escuelas = data;
    });
  }

  agregarOrientaciones(escuelaID: string) {
    this.bibliotecaDigitalService
      .getOrientacionesPorEscuela(escuelaID)
      .subscribe((data: any) => {
        this.orientaciones = data;
      });
  }

  agregarCursosOrientacion(ramaID: string) {
    this.bibliotecaDigitalService
      .getCursosPorOrientacion(ramaID)
      .subscribe((data: any) => {
        this.cursos = data;
      });
  }

  agregarMateriasCursoOrientacion(cursoID: string) {
    this.bibliotecaDigitalService
      .getMateriasPorCursoOrientacion(cursoID)
      .subscribe((data: any) => {
        this.materias = data;
      });
  }

  agregarUniversidades() {
    this.tipoInstitucion = "Universidad";
    this.bibliotecaDigitalService.getUniversidades().subscribe((data: any) => {
      this.universidades = data;
    });
  }

  agregarCarreras(universidadID: string) {
    this.bibliotecaDigitalService
      .getCarrerasPorUniversidad(universidadID)
      .subscribe((data: any) => {
        this.carreras = data;
      });
  }

  agregarCursosCarrera(ramaID: string) {
    this.bibliotecaDigitalService
      .getCursosPorCarrera(ramaID)
      .subscribe((data: any) => {
        this.cursos = data;
      });
  }

  agregarMateriasCursoCarrera(cursoID: string) {
    this.bibliotecaDigitalService
      .getMateriasPorCursoCarrera(cursoID)
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
  }

  set tipoInst(tipo: string) {
    this.subirForm.setValue({ tipoInst: tipo });
  }

  onReset() {
    this.subirForm.reset();
    this.crearFormularioParaSubirDocumento();
  }

  public onSubmit(formValue: any) {
    var notyf = new Notyf({
      duration: 3000,
      position: {
        x: "center",
        y: "top",
      },
    });

    if (this.autoresSelect.length > 0) {
      var autoresListString = this.autoresSelect.join("-");

      this.bibliotecaDigitalService
        .subirDocumento(
          this.subirForm.value["nombreDoc"],
          this.subirForm.value["descripcion"],
          this.subirForm.value["categorias"],
          this.subirForm.value["materia"],
          autoresListString,
          this.archivoSubir
        )
        .subscribe(
          (data) => {
            setTimeout(() => {
              location.reload();
            }, 500);
            notyf.success("Documento creado correctamente! ID: " + data.id);
          },
          (err) => {
            console.log(err);
          }
        );
      this.onReset();
    } else {
      notyf.error("Por favor, verifique los campos obligatorios.");
    }
  }

  get f() {
    return this.subirForm.controls;
  }

  private crearFormularioParaSubirDocumento() {
    this.subirForm = this.formBuilder.group({
      nombreDoc: ["", [Validators.required]],
      descripcion: ["", [Validators.nullValidator]],
      categorias: ["", [Validators.required]],
      tipoInst: [
        this.usuario && this.usuario.rol != "ADMIN" && this.institucion
          ? this.institucion["tipo_institucion"]
          : "Escuela",
        [Validators.required],
      ],
      institucion: ["", [Validators.required]],
      ramaInst: ["", [Validators.required]],
      curso: ["", [Validators.required]],
      materia: ["", [Validators.required]],
      nombreAut: ["", [Validators.required]],
      apellidoAut: ["", [Validators.required]],
      archivo: ["", [Validators.required]],
    });
    if (this.usuario && this.usuario.rol != "ADMIN") {
      console.log("entro por aca");
      this.subirForm.get("tipoInst").disable();
    }
  }
}
