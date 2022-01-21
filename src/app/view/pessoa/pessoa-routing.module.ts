import { PessoaReadComponent } from './components/pessoa-read/pessoa-read.component';
import { PessoaUpdateComponent } from './components/pessoa-update/pessoa-update.component';
import { PessoaCreateComponent } from './components/pessoa-create/pessoa-create.component';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/components/template/layout/layout.component';

const routes: Routes = [{
  path: 'pessoa', component: LayoutComponent,
  children: [
    {
      path: 'list', component: PessoaListComponent,
    },
    {
      path: 'create', component: PessoaCreateComponent,
    },
    {
      path: 'update/:id', component: PessoaUpdateComponent,
    },
    {
      path: 'read/:id', component: PessoaReadComponent,
    },
    { path: '', redirectTo: 'list', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
