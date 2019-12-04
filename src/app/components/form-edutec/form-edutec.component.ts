import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormBuilder, 
  Validators 
} from "@angular/forms";


@Component({
    selector: 'app-form-edutec',
    templateUrl: './form-edutec.component.html',
    styles: []
  })
  export class FormEdutecComponent implements OnInit {
    public pageData: any;
    public form: FormGroup;
    
    constructor(
      private formBuilder: FormBuilder
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
      //agregar algun msnjito de enviando datos
      console.log(formValue);
      this.onResetForm();
    }
  
    get nombre(){ return this.form.get('nombre') }
    get apellido(){ return this.form.get('apellido') }
    get nombreInst(){ return this.form.get('nombreInst') }
    get email(){ return this.form.get('email') }
    get telefono(){ return this.form.get('telefono') }

  }
  