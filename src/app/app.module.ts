import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ZyllemApiService } from './app.service';
import { ArticleModule } from './components/articles';
import { ViewDetailsComponent } from './components/view-details/view-details.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewDetailsComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    ArticleModule
  ],
  providers: [ZyllemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
