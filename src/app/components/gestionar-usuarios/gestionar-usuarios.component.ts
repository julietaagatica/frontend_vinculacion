import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notyf } from 'notyf';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BibliotecaDigitalService } from 'src/app/services/bibliotecaDigital.service';

@Component({
  selector: 'app-gestionar-usuarios',
  templateUrl: './gestionar-usuarios.component.html'
})
export class GestionarUsuariosComponent implements OnInit {
  
  agregarUserForm: FormGroup;
  modificarUserForm: FormGroup;
  submitted = false;
  submittedModif = false;

  usuarios: any[] = [];
  loading: boolean;
  idUsuarioSeleccionado: string = "";
  usuarioSeleccionado: any;

  instituciones: any[] = [];

  notyf: Notyf;

  constructor(private authServices: AuthenticationService, private bibliotecaDigitalService: BibliotecaDigitalService, private fb: FormBuilder) { 
    this.loading = true;
    this.buscarUsuarios();
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
    this.agregarUserForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      correo: ['', Validators.email],
      password: ['', Validators.required],
      rol: ['PROFESOR', Validators.required],
      telefono: [''],
      especialidad: [''],
      instId: ['', Validators.required],
    });
  }

  crearFormularioParaModificar() {
    this.modificarUserForm = this.fb.group({
      nombreUser: [this.usuarioSeleccionado ? this.usuarioSeleccionado.nombre : '', Validators.required],
      apellidoUser: [this.usuarioSeleccionado ? this.usuarioSeleccionado.apellido : '', Validators.required],
      usernameUser: [this.usuarioSeleccionado ? this.usuarioSeleccionado.username : '', Validators.required],
      correoUser: [this.usuarioSeleccionado ? this.usuarioSeleccionado.email : '', Validators.email],
      telefonoUser: [this.usuarioSeleccionado ? this.usuarioSeleccionado.telefono : ''],
      especialidadUser: [this.usuarioSeleccionado ? this.usuarioSeleccionado.especialidad : ''],
    });
  }
  
  get f() { return this.agregarUserForm.controls; }

  get f2() { return this.modificarUserForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.agregarUserForm.valid) {
      var user = {};
      user["nombre"] = this.agregarUserForm.value["nombre"];
      user["apellido"] = this.agregarUserForm.value["apellido"];
      user["email"] = this.agregarUserForm.value["correo"];
      user["password"] = this.agregarUserForm.value["password"];
      user["username"] = this.agregarUserForm.value["username"];
      user["rol"] = this.agregarUserForm.value["rol"];
      user["telefono"] = this.agregarUserForm.value["telefono"];
      user["especialidad"] = this.agregarUserForm.value["especialidad"];
      user["institucion_id"] = Number(this.agregarUserForm.value["instId"]);
      console.log("Usuario a postear: ", user["institucion_id"]);
      this.authServices.postUsuario(user).subscribe(data => {
        this.notyf.success("El usuario se agregó correctamente. ID: "+ data.id);
        setTimeout( () => { location.reload(true); }, 3000 );
      })
      this.onReset();
    }
  }

  onSubmitModif() {
    this.submittedModif = true;

    if (this.modificarUserForm.valid) {
      var user = {};
      user["nombre"] = this.modificarUserForm.value["nombreUser"];
      user["apellido"] = this.modificarUserForm.value["apellidoUser"];
      user["email"] = this.modificarUserForm.value["correoUser"];
      user["username"] = this.modificarUserForm.value["usernameUser"];
      user["telefono"] = this.modificarUserForm.value["telefonoUser"];
      user["especialidad"] = this.modificarUserForm.value["especialidadUser"];
      this.authServices.putUsuario(this.idUsuarioSeleccionado, user).subscribe(data => {
        this.notyf.success("El usuario se modificó correctamente. ID: "+ data.id);
        setTimeout( () => { location.reload(true); }, 500 );
      })
      this.onReset();
    }
    
  }

  eliminarUsuario() {
    this.authServices.deleteUsuario(this.idUsuarioSeleccionado).subscribe(() => {
      this.notyf.success("El usuario se eliminó correctamente.");
      setTimeout( () => { location.reload(true); }, 500 );
    });
  }

  onReset() {
    this.submitted = false;
    this.agregarUserForm.reset();
  }

  onResetModif() {
    this.submittedModif = false;
  }

  buscarUsuarios(){
    this.loading = true;
    this.authServices.getUsuarios()
      .subscribe((data: any) => {
        console.log(data);
        this.usuarios = data;
        this.loading = false;
      })
  }

  buscarUsuario(id:string){
    this.authServices.getUsuario(id)
      .subscribe((data: any) => {
        console.log(data);
        this.usuarioSeleccionado = data;
        this.crearFormularioParaModificar();
      })
  }

  buscarInstituciones(){
    this.bibliotecaDigitalService.getInstituciones()
      .subscribe((data: any) => {
        this.instituciones = data;
      })
  }

  seleccionarUser(userID){
    this.idUsuarioSeleccionado = userID;
    this.buscarUsuario(userID);
  }
}
