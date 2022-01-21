import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
@Component({
  selector: 'app-base-dialog-add',
  templateUrl: './base-dialog-add.component.html',
  styleUrls: ['./base-dialog-add.component.css']
})
export class BaseDialogAddComponent implements OnInit {
  public section;
  public formAdd;

  public localForm: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.section = data.section;
    this.formAdd = data.formAdd;
    this.localForm = _.cloneDeep(this.formAdd);
  }

  ngOnInit(): void { }

  public save() {
    this.formAdd.patchValue(this.localForm.value);
  }
}
