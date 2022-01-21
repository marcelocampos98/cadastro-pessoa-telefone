import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cadastro-pessoa';

  ngOnInit(): void {
    const pessoas = [
      {
        id: 1,
        nome: 'João',
        cpf: '12345678901',
        dataNascimento: '01/01/2000',
      },
      {
        id: 2,
        nome: 'Maria',
        cpf: '12345678902',
        dataNascimento: '01/01/2000',
      },
      {
        id: 3,
        nome: 'José',
        cpf: '12345678903',
        dataNascimento: '01/01/2000',
        telefones: [
          {
            telefone: '67991230337',
          },
          {
            telefone: '67995064295',
          }
        ]
      },
    ];

    localStorage.setItem('pessoas', JSON.stringify(pessoas));
  }
}
