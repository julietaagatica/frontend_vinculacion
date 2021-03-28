import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute} from "@angular/router";
import { User } from "src/app/models/user.model";
import { StorageService } from 'src/app/services/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-mesa-ayuda',
  templateUrl: './mesa-ayuda.component.html',
  providers: [StorageService],
})
  
export class MesaAyudaComponent implements OnInit {

  public contactarForm: FormGroup;
  public submitted = false;
  private usuario: User;
  public preguntasFrecuentes: any[];
  public loading: boolean;
  public faq: any = {};

  constructor(
    private usuariosService: UsuarioService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) { 
    this.crearFormularioParaContactar();
  }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.storageService.getCurrentUser();
    this.obtenerPreguntasFrecuentes()
  }

  crearFormularioParaContactar(){
    this.contactarForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
    });
  }

  get f() { return this.contactarForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contactarForm.valid) {
      var emailData = {};

      emailData["nombre"] = this.contactarForm.value["nombre"]
      emailData["correo"] = this.contactarForm.value["correo"]
      emailData["asunto"] = this.contactarForm.value["asunto"]
      emailData["mensaje"] = this.contactarForm.value["mensaje"]

      this.usuariosService.enviarEmailDeContacto(emailData).subscribe(data => {
        alert("El correo fué enviado exitosamente");
        setTimeout( () => { location.reload(true); }, 500 );
      })
      this.onReset();
    }
  }

  onReset() {
    this.submitted = false;
    this.contactarForm.reset();
  }
  
  obtenerPreguntasFrecuentes() {
    this.loading = true;
    this.usuariosService.obtenerPreguntasFrecuentes()
      .subscribe((data: any) => {
        this.preguntasFrecuentes = data;
        this.loading = false;
      })
  }

  eliminarPreguntaFrecuente(idFaq: string) {
    this.usuariosService.eliminarPreguntaFrecuente(idFaq).subscribe();
    setTimeout( () => { location.reload(true); }, 500 );
  }

  agregarNuevaPregunta(pregunta: string, respuesta: string) {
    this.usuariosService.agregarNuevaPregunta(pregunta, respuesta);
    setTimeout( () => { location.reload(true); }, 500 );
  }

  guardarID(id: string) {
    this.usuariosService.getPreguntaFrecuente(id)
      .subscribe(
        (data: any) => {
          this.faq = data
          console.log(data);
        }
      );
  }

  modificarPreguntaFrecuente(id: string, pregunta: string, respuesta: string) {
    this.usuariosService.modificarPreguntaFrecuente(id,pregunta, respuesta);
    setTimeout( () => { location.reload(true); }, 500 );
  }
}
