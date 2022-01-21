import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../pessoa.service';

@Component({
  selector: 'app-pessoa-read',
  templateUrl: './pessoa-read.component.html',
  styleUrls: ['./pessoa-read.component.scss']
})
export class PessoaReadComponent implements OnInit {
  public data: any;
  public title: string;
  public formField: any;
  public routerCancel: Array<string>;
  public id: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private pessoaService: PessoaService
  ) {
    this.title = 'Pessoa';
    this.routerCancel = ['/pessoa/list'];
    this.formField = this.createFields();
  }

  public createFields(): any {
    return this.pessoaService.getFields();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.data = JSON.parse(localStorage.getItem('pessoas') as string);
    this.data = this.data.find((x: any) => x.id == this.id);
  }

  public beforeSave(form: any) {
    form.addControl("id", this.fb.control(this.id));
  }

}
