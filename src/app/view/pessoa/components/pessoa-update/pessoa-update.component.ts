import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PessoaService } from '../../pessoa.service';

@Component({
  selector: 'app-pessoa-update',
  templateUrl: './pessoa-update.component.html',
  styleUrls: ['./pessoa-update.component.scss']
})
export class PessoaUpdateComponent implements OnInit {
  public data: any;
  public title: string;
  public formField: any;
  public urlSave: string = '';
  public routerCancel: Array<string>;
  public id: any;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private pessoaService: PessoaService
  ) {
    this.title = 'Atualizar Pessoa';
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
    form.addControl("id", this.fb.control(this.data.id));
  }

  public saveData(form: any) {
    let pessoas = JSON.parse(localStorage.getItem('pessoas') as string).filter((p: any) => p.id != form.id);

    if (pessoas.find((p: any) => p.cpf === form.cpf)) {
      this.toastr.error('CPF já cadastrado!');
    } else {
      pessoas.push({ ...form });
      localStorage.setItem('pessoas', JSON.stringify(pessoas));
      this.toastr.success('Pessoa cadastrada com sucesso!');
      this.router.navigate(['/pessoa/list']);
    }
  }

}
