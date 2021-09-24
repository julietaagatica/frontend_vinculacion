import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormBuilder, 
  Validators 
} from "@angular/forms";
import { UsuarioService } from 'src/app/services/usuario.service';
import { Notyf } from 'notyf';


@Component({
    selector: 'app-form-edutec',
    templateUrl: './form-edutec.component.html',
    styles: []
  })
  export class FormEdutecComponent implements OnInit {
    public form: FormGroup;
    public notyf: Notyf;
    valores: string[] = []
    
    constructor(
      private formBuilder: FormBuilder,
      private formulario: UsuarioService,
    ) {
      this.notyf = new Notyf({
        duration: 3000,
        position: {
          x: "center",
          y: "top",
        },
      });
    }
  
  
    ngOnInit() {
      this.obtaingPageDataFromRoute();
    }
  
    private obtaingPageDataFromRoute(){
      //this.pageData = this.activatedRoute.snapshot.data;
      this.form = this.formBuilder.group({
        nombre: [
          '',
          [Validators.required]
        ],
        apellido: [
          '',
          [Validators.required]
        ],
        nombreInst: [
          '',
          [Validators.required]
        ],
        email: [
          '',
          [Validators.required, Validators.email]
        ],
        telefono: [
          '',
          [Validators.required]
        ]
      });
    }

    onResetForm() {
      this.form.reset();
    }
  
    public onSubmit(formValue: any){
      this.formulario.enviarFormulario(formValue["email"],formValue["nombre"] +' '+formValue["apellido"],formValue["nombreInst"],formValue["telefono"]).subscribe(
        data => {
          this.notyf.success("La solicitud se envió con éxito");
          setTimeout( () => { location.reload(true); }, 1000 );
        },
        error => {
          this.notyf.error("Hubo un error al enviar la solicitud");
          setTimeout( () => { location.reload(true); }, 1000 );
        }
      );
      this.onResetForm();
    }
  
    get nombre(){ return this.form.get('nombre') }
    get apellido(){ return this.form.get('apellido') }
    get nombreInst(){ return this.form.get('nombreInst') }
    get email(){ return this.form.get('email') }
    get telefono(){ return this.form.get('telefono') }
    
  }
  