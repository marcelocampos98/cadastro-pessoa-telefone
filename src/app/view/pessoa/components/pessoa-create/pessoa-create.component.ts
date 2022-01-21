import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PessoaService } from '../../pessoa.service';

@Component({
  selector: 'app-pessoa-create',
  templateUrl: './pessoa-create.component.html',
  styleUrls: ['./pessoa-create.component.scss']
})
export class PessoaCreateComponent implements OnInit {
  public title: string;
  public formField: any;
  public routerCancel: Array<string>;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private pessoaService: PessoaService
  ) {
    this.title = 'Nova Pessoa';
    this.routerCancel = ['/pessoa/list'];
    this.formField = this.createFields();
  }

  ngOnInit(): void {
  }

  public createFields(): any {
    return this.pessoaService.getFields();
  }

  public saveData(form: any) {
    let pessoas = JSON.parse(localStorage.getItem('pessoas') as string);
    let id = pessoas.length + 1;

    if (pessoas.find((p: any) => p.cpf === form.cpf)) {
      this.toastr.error('CPF já cadastrado!');
    } else {
      pessoas.push({ ...form, id: id });
      localStorage.setItem('pessoas', JSON.stringify(pessoas));
      this.toastr.success('Pessoa cadastrada com sucesso!');
      this.router.navigate(['/pessoa/list']);
    }
  }
}
