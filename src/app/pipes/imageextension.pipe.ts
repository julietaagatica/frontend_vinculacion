import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageextension'
})
export class ImageextensionPipe implements PipeTransform {

  transform(name: string): string {
    var splitedName = name.split(".");
    var extension = splitedName[splitedName.length - 1];

    return "assets/img/" + extension.toLocaleLowerCase() + "-logo.png";
  }

}
