import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FieldType } from 'src/app/model/FieldType';

@Component({
  selector: 'app-telefones-section',
  templateUrl: './telefones-section.component.html',
  styleUrls: ['./telefones-section.component.scss']
})
export class TelefonesSectionComponent implements OnInit {
  @Input() form!: any;

  public field = {
    key: 'telefone',
    label: 'Telefone',
    type: FieldType.PHONE,
  }

  displayedColumns: string[] = ['telefone'];

  telefoneControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

}
