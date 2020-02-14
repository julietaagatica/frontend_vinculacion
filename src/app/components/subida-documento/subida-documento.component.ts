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

  public pageData: any;
  public subirForm: FormGroup;
  valores: string[] = [];
  tipoInst: string = "escuela";
  
  constructor(
    private formBuilder: FormBuilder,
    private bibliotecaDigitalService: BibliotecaDigitalService
  ) { }

  ngOnInit() {
    this.obtaingPageDataFromRoute();
  }


  private obtaingPageDataFromRoute(){
    //this.pageData = this.activatedRoute.snapshot.data;
    this.subirForm = this.formBuilder.group({
      tipoInst: ['escuela', [Validators.required]]
    });
  }

  onResetForm() {
    this.subirForm.reset();
  }

  public onSubmit(formValue: any){
    //agregar algun msnjito de enviando datos
    console.log(formValue);
    this.bibliotecaDigitalService.subirDocumento()
    this.onResetForm();
  }
  
  changeTypeInstitution (event: any) {
    this.tipoInst = event.target.value
  }

}
