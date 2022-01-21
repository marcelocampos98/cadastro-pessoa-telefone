import { FieldType } from 'src/app/model/FieldType';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from '../base-component';
import { BaseCrudService } from '../base-crud.service';
import { CPFValidator } from 'src/app/validators/cpf.Validator';

@Component({
  selector: 'app-base-create',
  templateUrl: './base-create.component.html',
  styleUrls: ['./base-create.component.css']
})
export class BaseCreateComponent extends BaseComponent implements OnInit {
  @Input() title!: string;
  @Input() formField!: any;
  @Input() urlSave!: string;
  @Input() urlDelete!: string;
  @Input() routerCancel!: Array<string>;
  @Input() data!: any;
  @Input() isEdit: boolean = false;
  @Input() isDelete: boolean = false;
  @Input() isRead: boolean = false;

  @Output() beforeSave = new EventEmitter();
  @Output() files = new EventEmitter<any>();
  @Output() file = new EventEmitter<any>();
  @Output() saveData = new EventEmitter();

  public form: any = this.fb.group({});

  constructor(
    private router: Router,
    private baseCrudService: BaseCrudService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    super();
  }


  ngOnInit(): void {
    this.buildForm();

    if (this.data) {
      this.form.patchValue(this.data);
      this.populateSections(this.data, this.form);
    }

    if (this.isDelete || this.isRead) {
      this.form.disable();
    }
  }

  public cancel() {
    this.router.navigate(this.routerCancel);
  }

  public buildForm() {
    this.formAddSection(this.formField);
  }

  private populateSections(data: any, form?: any) {
    this.baseCrudService.populateSections(data, form);
  }


  private formAddSection(section: any, form?: any) {
    let sectionForm: any;

    if (section?.type == 'Table') {
      sectionForm = this.fb.array([]);
    } else {
      sectionForm = this.fb.group({});
      section.fields?.forEach((field: any) => this.formAddControl(field, sectionForm));
    }

    form ? form.addControl(section.key, sectionForm) : this.form = sectionForm;

    section.sections?.forEach((section: any) => this.formAddSection(section, sectionForm));
  }

  private formAddControl(field: any, form: any) {
    form.addControl(field.key, this.fb.control(null));
    if (field.readOnly) {
      form.get(field.key).disable();
    }
    if (field.required) {
      form.get(field.key).addValidators(Validators.required);
      form.get(field.key).updateValueAndValidity();
    }
    if (field.type == FieldType.CPF) {
      form.get(field.key).addValidators(CPFValidator.ValidaCpf);
      form.get(field.key).updateValueAndValidity();
    }
    if (field.hasOwnProperty('defaultValue')) {
      form.get(field.key).setValue(field.defaultValue);
    }
  }

  public save() {
    if (this.form.valid) {
      this.beforeSave.emit(this.form);
      this.isEdit ? this.updateForm() : this.saveForm();
    } else {
      this.form.markAllAsTouched();
      this.baseCrudService.markTouchedEvent();
    }
  }

  public remove() {
    this.baseCrudService.delete(this.urlDelete)
  }

  public saveForm() {
    if (this.urlSave) {
      this.baseCrudService.save(this.urlSave, this.form?.getRawValue())
    } else {
      this.saveData.emit(this.form?.getRawValue());
    }
  }

  public updateForm() {
    if (this.urlSave) {
      this.baseCrudService.update(this.urlSave, this.form?.value)
    }
    else {
      this.saveData.emit(this.form?.getRawValue());
    }
  }

  setFiles(event: any) {
    this.files.emit(event);
  }

  setFile(event: any) {
    this.file.emit(event);
  }
}
