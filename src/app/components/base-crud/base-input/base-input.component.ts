import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { ReplaySubject, Subscription } from 'rxjs';
import { FieldType } from 'src/app/model/FieldType';
import { BaseComponent } from '../base-component';
import { BaseCrudService } from '../base-crud.service';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.css']
})
export class BaseInputComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() field!: any;
  @Input() control!: any;
  @Input() items: Array<any> = [];

  @Output() change = new EventEmitter();
  @Output() changeItems = new EventEmitter();

  public controlData!: FormControl;
  public controlSelect!: FormControl;

  public yesOrNo = [
    { value: 1, label: 'Sim' },
    { value: 0, label: 'Não' }
  ];

  public fieldType = FieldType;

  public filteredItems: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public filterCtrl = new FormControl();
  public subscriptionAutoComplete: Subscription = new Subscription();


  constructor(
    private baseCrudService: BaseCrudService,
    private fb: FormBuilder,
  ) {
    super();
  }
  ngOnChanges(changes: any): void {
    if (changes.items) {
      this.filteredItems.next(this.items?.slice());
    }
  }

  async ngOnInit(): Promise<void> {
    this.baseCrudService.validForm.subscribe(data => {
      if (data) {
        this.controlData?.markAllAsTouched();
        this.controlSelect?.markAllAsTouched();
      }
    });

    if (this.field.options) {
      this.items = this.field.options;
    } else if (this.field.url && this.field.type != FieldType.AUTOCOMPLETE) {
      let options = await this.baseCrudService.getOptions(this.field.url, true);
      this.items = options;
      this.filteredItems.next(this.items?.slice());
    } else if (this.field.type === FieldType.BOOLEAN) {
      this.items = this.yesOrNo;
    } else {
      this.items = [];
    }

    if (this.field.type == FieldType.AUTOCOMPLETE) {
      if (this.control.value) {
        this.items = this.control.value;
        const values = this.control.value.map((item: any) => {
          return this.getItemValue(item);
        });
        this.controlSelect = new FormControl(values);
      } else {
        this.controlSelect = new FormControl();
      }
    }

    if (this.field.type == FieldType.SELECT) {
      if (this.control.value) {
        if (this.field.fullObjectFromValue) {
          this.controlSelect = new FormControl(this.control.value.id);
        } else {
          this.controlSelect = new FormControl(this.control.value);
        }
      } else {
        this.controlSelect = new FormControl();
      }
    }

    if (this.field.type == FieldType.MULTISELECT) {
      if (this.control.value) {
        const values = this.control.value.map((item: any) => {
          return this.getItemValue(item);
        });
        this.controlSelect = new FormControl(values);
      } else {
        this.controlSelect = new FormControl();
      }
    }

    if ([FieldType.DATA, FieldType.DATA_HORA].includes(this.field.type)) {
      if (this.control.value) {
        if (this.field.type == FieldType.DATA) {
          this.controlData = new FormControl(moment(this.control.value).format('YYYY-MM-DDTHH:mm'));
        } else {
          this.control.setValue(moment(this.control.value).format('YYYY-MM-DDTHH:mm'));
          this.controlData = new FormControl(moment(this.control.value).format('YYYY-MM-DDTHH:mm'));
        }
      } else {
        this.controlData = new FormControl();
      }

      this.subscription.add(
        this.controlData.valueChanges.subscribe(value => {
          if (this.field.type == FieldType.DATA) {
            this.control.setValue(moment(value).format('YYYY-MM-DD HH:mm'));
          } else {
            this.control.setValue(moment(value).format('YYYY-MM-DDTHH:mm'));
          }
        })
      );
    }

    if (this.control.disabled) {
      this.controlData?.disable();
      this.controlSelect?.disable();
    }

    this.subscription.add(
      this.controlSelect?.valueChanges.subscribe(value => {
        if (this.field.fullObjectFromValue) {
          if (this.field.type == FieldType.SELECT) {
            const item = this.items.find(item => item.id === value);

            this.control.setValue(item);
          } else if (this.field.type == FieldType.MULTISELECT || this.field.type == FieldType.AUTOCOMPLETE) {
            const items = this.items.filter(item => value.includes(this.getItemValue(item)));

            if (this.control instanceof FormArray) {
              this.control.clear();
              items.forEach(item => {
                let form = this.fb.group({});
                this.baseCrudService.populateSections(item, form);
                this.control.push(form)
              });
            } else {
              this.control.setValue(items);
            }
          }
        } else {
          this.control.setValue(value);
        }
      })
    );

    this.filteredItems.next(this.items?.slice());

    this.subscription.add(
      this.filterCtrl.valueChanges.pipe().subscribe(() => this.filterItems())
    );
  }


  protected async filterItems() {
    if (this.field.type == FieldType.AUTOCOMPLETE) {
      if (this.filterCtrl.value) {
        if (this.subscriptionAutoComplete) {
          this.subscriptionAutoComplete.unsubscribe();
        }
        // this.subscriptionAutoComplete = this.http.get(`${this.field.url}?search=${this.filterCtrl.value}`).subscribe((data: any) => {
        //   let previousItems = this.items;
        //   this.items = data.params.concat(previousItems);
        //   this.filteredItems.next(this.items?.slice());
        //   this.changeItems.emit(this.items);
        // });
      }
    }

    if (!this.items) {
      return;
    }

    let search = this.filterCtrl?.value;
    if (!search) {
      this.filteredItems.next(this.items?.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredItems.next(
      this.items.filter(item => this.getItemLabel(item).toLowerCase().indexOf(search) > -1)
    );
  }

  public getLabelItems(item: any): string {
    return this.field.labelKey ? item[this.field.labelKey] : item.label;
  }

  public getItemValue(item: any): string {
    return this.field.valueKey ? item[this.field.valueKey] : item.id;
  }

  get errorMessage() {
    if (this.control !== undefined) {
      for (const propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched || propertyName === 'customService')) {
          return this.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        }
      }
    }

    return null;
  }

  public getValidatorErrorMessage(validatorName: string, validatorValue?: any): any {
    const config: any = {
      'required': 'Obrigatório',
      'email': 'e-mail Inválido',
      'menorDeIdade': 'Não é permitido cadastro de menores de 18 anos de idade.',
      'invalidCreditCard': 'Inválido',
      'invalidEmailAddress': 'Inválido',
      'invalidPassword': 'Inválido. A senha deve conter pelo menos 6 caracteres e 1 número.',
      'cnpjNotValid': 'O CNPJ da empresa é inválido',
      'cnpjCpfNotValid': 'O CNPJ/CPF é inválido',
      'validUrl': 'URL inválida, digite a url completa contendo http:// ou https://.',
      'cpfInvalido': 'CPF Inválido',
      'minlength': `Tamanho Mínimo ${validatorValue.requiredLength}`,
      'validateEqual': 'Campo diferente',
      'validateIf': 'Obrigatório',
      'customService': ` ${validatorValue}`,
      'rangeAno': `O ano tem que estar ${validatorValue}`,
      'maxLength': `Quantidade de caracteres tem que ser menor que ${validatorValue}`,
      'owlDateTimeMin': `Data inferior a data mínima permitida ${validatorValue.min}`,
      'owlDateTimeMax': `Data superior a data mínima permitida ${validatorValue.max}`,
      'cep': 'CEP inválido',
    };

    return config[validatorName];
  }

  getItemLabel(item: any) {
    return this.field.labelKey ? item[this.field.labelKey] : item.label || item.descricao;
  }

  changeEmit() {
    this.change.emit();
  }

  bluerEmit() {
    this.control.markAsTouched();
  }

  isFieldShowDependenciesFullfilled() {
    if ([FieldType.DATA, FieldType.DATA_HORA].includes(this.field.type)) {
      return this.control && this.controlData;
    } else if ([FieldType.SELECT, FieldType.BOOLEAN, FieldType.MULTISELECT, FieldType.AUTOCOMPLETE].includes(this.field.type)) {
      return this.control && this.controlSelect && this.filterCtrl;
    } else {
      return this.control;
    }
  }
}
