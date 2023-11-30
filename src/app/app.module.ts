import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ZyllemApiService } from './app.service';
import { ArticleModule } from './components/articles';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { ViewDetailsComponent } from './components/view-details/view-details.component';

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
  ],
  providers: [ZyllemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
