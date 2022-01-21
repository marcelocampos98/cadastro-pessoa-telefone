import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {
  validForm = new BehaviorSubject(false);

  constructor() { }

  public getList(uri: string, params?: any) {
  }

  public save(uri: string, data: any) {
  }

  public update(uri: string, data: any) {
  }

  public delete(uri: string) {
  }

  public async getOptions(uri: string, notCache?: boolean): Promise<Array<any>> {
    let options;

    if (localStorage.getItem(uri) && !notCache) {
      options = JSON.parse(localStorage.getItem(uri) as string);
    } else {
      if (notCache) {
        localStorage.setItem(uri, JSON.stringify(options));
      }
    }
    return options;
  }

  // Metodo Recursivo pra replicar os dados do objeto para os formularios reativos do angular
  public populateSections(data: any, form?: any) {
    let fb = new FormBuilder()

    Object.keys(data).forEach(key => {
      if (form.get(key) && form.get(key).value == data[key]) {
      } else if (Array.isArray(data[key]) && form.get(key)?.value?.length == 0) {
        data[key].forEach((element: any, index: any) => {
          let sectionForm = fb.group({});
          form.get(key).push(sectionForm);
          this.populateSections(element, form.get(key).controls[index]);
        });
      } else if (Array.isArray(data[key]) && form.get(key)?.value == null) {
        let sectionForm = fb.array([]);
        form.addControl(key, sectionForm);
        data[key].forEach((element: any, index: any) => {
          let sectionForm = fb.group({});
          form.get(key).push(sectionForm);
          this.populateSections(element, form.get(key).controls[index]);
        });
      } else if (typeof data[key] == 'object' && data[key] != null) {
        let sectionForm = fb.group({});
        form.addControl(key, sectionForm);
        this.populateSections(data[key], form.get(key));
      } else {
        form.addControl(key, fb.control(data[key]));
      }
    });
  }

  public markTouchedEvent() {
    this.validForm.next(true);
  }
}
