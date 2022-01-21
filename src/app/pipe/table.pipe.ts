import { Pipe, PipeTransform } from '@angular/core';
import { FieldType } from '../model/FieldType';

@Pipe({
  name: 'table'
})
export class TablePipe implements PipeTransform {
  constructor() {
  }

  async transform(value: any, column: any): Promise<unknown> {
    if (column.type === FieldType.BOOLEAN) {
      if (value === 1) {
        value = 'Sim';
      } else if (value === 0) {
        value = 'Não';
      }
    } else if (column.type === FieldType.SELECT) {
      value = column.options.find((option: any) => option.id === value).label;
    }
    return value
  }

}
