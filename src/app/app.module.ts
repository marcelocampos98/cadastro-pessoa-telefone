import { PessoaModule } from './view/pessoa/pessoa.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { LayoutComponent } from './components/template/layout/layout.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './view/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuListItemComponent } from './components/template/menu-list-item/menu-list-item.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    LayoutComponent,
    HomeComponent,
    MenuListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    PessoaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
