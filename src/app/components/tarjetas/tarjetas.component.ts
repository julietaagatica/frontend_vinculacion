import { Component, Input} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html'
})
export class TarjetasComponent {

  @Input() items: any[] = [];
  constructor(private router: Router) { }

  verDocumento(item: any) {
    let documentoID;
    documentoID = item.id;
    
    this.router.navigate([ '/documento', documentoID ]);
  }
}
