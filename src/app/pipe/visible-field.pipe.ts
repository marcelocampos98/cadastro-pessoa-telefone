import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visibleField'
})
export class VisibleFieldPipe implements PipeTransform {

  transform(value: Array<any> | null, ...args: unknown[]) {
    let result: any[] = [];
    result = value?.filter(item => item.visible !== false) as any[];
    return result;
  }

}
