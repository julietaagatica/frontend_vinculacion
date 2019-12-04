import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormBuilder, 
  Validators 
} from "@angular/forms";


@Component({
  selector: 'app-espacio-institucional',
  templateUrl: './espacio-institucional.component.html',
  styles: []
})
export class EspacioInstitucionalComponent implements OnInit {
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
        'escuela@ejemplo.com',
        [Validators.required, Validators.email]
      ],
      telefono: [
        '',
        [Validators.required]
      ]
    });
  }

  public onSubmit(formValue: any){
    //agregar algun msnjito de enviando datos
    console.log(formValue)

  }



}
