import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseListComponent } from './base-list/base-list.component';
import { BaseCreateComponent } from './base-create/base-create.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BaseInputComponent } from './base-input/base-input.component';
import { MatInputModule } from '@angular/material/input';
import { BidiModule } from '@angular/cdk/bidi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { VisibleFieldPipe } from 'src/app/pipe/visible-field.pipe';
import { BaseSimpleSectionComponent } from './base-simple-section/base-simple-section.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TablePipe } from 'src/app/pipe/table.pipe';
import { NgxMaskModule } from 'ngx-mask';
import { TelefonesSectionComponent } from './sections/telefones-section/telefones-section.component';
import { BaseDialogAddComponent } from './base-dialog-add/base-dialog-add.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    BaseListComponent,
    BaseCreateComponent,
    BaseInputComponent,
    VisibleFieldPipe,
    BaseSimpleSectionComponent,
    TablePipe,
    TelefonesSectionComponent,
    BaseDialogAddComponent
  ],
  exports: [
    BaseListComponent,
    BaseCreateComponent,
    BaseSimpleSectionComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BidiModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    ToastrModule.forRoot({ timeOut: 1500 }),
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    MatSlideToggleModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ]
})
export class BaseCrudModule { }
