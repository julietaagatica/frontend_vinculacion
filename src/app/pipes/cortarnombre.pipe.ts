import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cortarnombre'
})
export class CortarnombrePipe implements PipeTransform {

  transform(nombre:string): string {
    var nombreCorto = nombre.length>20 ? nombre.substring(0,20)+".." : nombre;
    return nombreCorto;
  }

}
