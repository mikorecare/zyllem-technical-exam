import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ZyllemApiService } from './app.service';
import { ArticleModule } from './components/articles';
import { FeatureComponent } from './articles/feature/feature.component';

@NgModule({
  declarations: [
    AppComponent,
    FeatureComponent
  ],
  imports: [
    BrowserModule,
    ArticleModule
  ],
  providers: [ZyllemApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
