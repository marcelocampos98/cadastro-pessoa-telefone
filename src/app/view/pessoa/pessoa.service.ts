import { Injectable } from '@angular/core';
import { FieldType } from 'src/app/model/FieldType';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor() { }

  public getFields() {
    return {
      key: 'pessoa',
      fields: [
        {
          key: 'nome',
          label: 'Nome',
          required: true,
        },
        {
          key: 'cpf',
          label: 'CPF',
          type: FieldType.CPF,
          required: true,
        },
        {
          key: 'dataNascimento',
          label: 'Data de Nascimento',
          type: FieldType.DATA,
          required: true,
        },
      ],
      sections: [
        {
          key: 'telefones',
          type: 'Table',
          title: 'Telefone',
          class: 'col-md-12',
          fields: [
            {
              key: 'telefone',
              label: 'Telefone',
              type: FieldType.PHONE,
              required: true,
            }
          ],
          columns: [
            {
              description: 'Telefone',
              code: 'telefone',
            }
          ]
        }
      ]
    }
  }
}
