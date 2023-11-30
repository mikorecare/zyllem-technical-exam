import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ZyllemApiService } from './app.service';
import { ArticleModule } from './components/articles';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { ViewDetailsComponent } from './components/view-details/view-details.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewDetailsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ArticleModule,
    FormsModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
