import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormBuilder, 
  Validators 
} from "@angular/forms";
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
    selector: 'app-form-edutec',
    templateUrl: './form-edutec.component.html',
    styles: []
  })
  export class FormEdutecComponent implements OnInit {
    public form: FormGroup;
    valores: string[] = []
    
    constructor(
      private formBuilder: FormBuilder,
      private formulario: UsuarioService,
    ) {}
  
  
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
      this.formulario.enviarFormulario(formValue["email"],formValue["nombre"] +' '+formValue["apellido"],formValue["nombreInst"],formValue["telefono"]);
      this.onResetForm();
      alert("La solicitud fue enviada con éxito");
      setTimeout( () => { location.reload(true); }, 500 );
    }
  
    get nombre(){ return this.form.get('nombre') }
    get apellido(){ return this.form.get('apellido') }
    get nombreInst(){ return this.form.get('nombreInst') }
    get email(){ return this.form.get('email') }
    get telefono(){ return this.form.get('telefono') }
    
  }
  