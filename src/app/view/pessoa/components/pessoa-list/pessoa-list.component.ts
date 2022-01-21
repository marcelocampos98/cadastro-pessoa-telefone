import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {
  public data: any;
  public buttonAdd: any = { label: 'Adicionar Pessoa', link: '/pessoa/create' };
  public displayedColumns: any = [
    {
      code: 'nome',
      description: 'Nome',
    },
    {
      code: 'cpf',
      description: 'CPF'
    },
    {
      code: 'dataNascimento',
      description: 'Data de Nascimento',
      type: 'date'
    },
    {
      code: 'action',
      description: 'Ações',
      actions: [
        { icon: 'visibility', link: '/pessoa/read', class: 'visibility', tooltip: 'Visualizar' },
        { icon: 'edit', link: '/pessoa/update', class: 'edit', tooltip: 'Editar' },
        { icon: 'delete', class: 'delete', tooltip: 'Excluir', function: this.delete },
      ]
    },
  ];;
  constructor() { }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('pessoas') as string);
  }

  delete(data: any) { }

}
