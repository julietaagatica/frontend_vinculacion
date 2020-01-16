import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormBuilder, 
  Validators 
} from "@angular/forms";
import { EspacioInstitucionalService } from 'src/app/services/espacioInstitucional.service';


@Component({
  selector: 'app-espacio-institucional',
  templateUrl: './espacio-institucional.component.html',
  styles: []
})
export class EspacioInstitucionalComponent implements OnInit {
  public pageData: any;
  public form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private formulario: EspacioInstitucionalService
  ) {}


  ngOnInit() {
   
  }

}
