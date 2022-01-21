import { BaseCrudModule } from './../../components/base-crud/base-crud.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaCreateComponent } from './components/pessoa-create/pessoa-create.component';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaUpdateComponent } from './components/pessoa-update/pessoa-update.component';
import { PessoaReadComponent } from './components/pessoa-read/pessoa-read.component';


@NgModule({
  declarations: [
    PessoaCreateComponent,
    PessoaListComponent,
    PessoaUpdateComponent,
    PessoaReadComponent
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    BaseCrudModule
  ]
})
export class PessoaModule { }
