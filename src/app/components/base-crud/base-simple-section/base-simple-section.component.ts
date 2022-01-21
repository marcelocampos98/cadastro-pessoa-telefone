import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BaseDialogAddComponent } from '../base-dialog-add/base-dialog-add.component';

@Component({
  selector: 'app-base-simple-section',
  templateUrl: './base-simple-section.component.html',
  styleUrls: ['./base-simple-section.component.css']
})

export class BaseSimpleSectionComponent implements OnInit {
  @Input() section: any;
  @Input() form: any;

  @Output() fieldChange = new EventEmitter();
  @Output() files = new EventEmitter<any>();
  @Output() file = new EventEmitter<any>();

  public formAdd: any;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  tableColumns(section: any) {
    return section.columns;
  }

  columns(section: any) {
    let result = section.columns?.map((c: any) => c.code);

    if (!this.form.disabled) {
      result = result?.concat('actions');
    }

    return result;
  }

  public buildForm(section: any) {
    this.formAddSection(section);
  }

  private formAddSection(section: any, form?: any) {
    let sectionForm = this.fb.group({});

    section.fields?.forEach((field: any) => this.formAddControl(field, sectionForm));

    form ? form.addControl(section.key, sectionForm) : this.formAdd = sectionForm;

    section.sections?.forEach((section: any) => this.formAddSection(section, sectionForm));
  }

  private formAddControl(field: any, form: any) {
    form.addControl(field.key, this.fb.control(null));
  }

  removeitem(form: any, index: number) {
    form.removeAt(index);
  }

  edititem(section: any, form: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      section: section,
      formAdd: form,
    }

    const dialogRef = this.dialog.open(BaseDialogAddComponent, dialogConfig);
  }

  getField(section: any, code: string) {
    return section.fields?.find((f: any) => f.key === code);
  }

  change(event: any) {
    this.fieldChange.emit(event);
  }

  setFiles(event: any, section?: any) {
    this.files.emit({ event: event, section: section });
  }

  setFile(event: any, section?: any) {
    this.file.emit({ event: event, section: section });
  }

  additem(section: any) {
    const dialogConfig = new MatDialogConfig();

    this.buildForm(section);

    dialogConfig.data = {
      section: section,
      formAdd: this.formAdd,
    }

    const dialogRef = this.dialog.open(BaseDialogAddComponent, dialogConfig);
    dialogRef.beforeClosed().subscribe(result => {
      if (result) {
        this.form.get(section.key).push(this.formAdd);
      }
    });
  }
}

