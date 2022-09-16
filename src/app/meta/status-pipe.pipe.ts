import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipePipe implements PipeTransform {

  transform(value: number, enumValue: any): any {
    return Object.values(enumValue)[value];
  }

}
