import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router, ActivatedRoute} from "@angular/router";
import { User } from "src/app/models/user.model";
import { StorageService } from 'src/app/services/storage.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-mesa-ayuda',
  templateUrl: './mesa-ayuda.component.html',
  providers: [StorageService],
})
  
export class MesaAyudaComponent implements OnInit {

  private usuario: User;
  public preguntasFrecuentes: any[];
  public loading: boolean; 
  public faq: any = {};

  constructor(
    private usuariosService: UsuarioService,
    private routerNavigate: Router,
    private router: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.usuario = this.storageService.getCurrentUser();
    this.obtenerPreguntasFrecuentes()
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
