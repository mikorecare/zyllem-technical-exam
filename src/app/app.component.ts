import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  OnInit
} from '@angular/core';

import { ZyllemApiService } from "./app.service";
import { Article, VideoArticle } from './model/article';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  constructor(
    private readonly apiService: ZyllemApiService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  private results!: Article[];
  videoArticleHighlight!: VideoArticle;
  test:any = []

  get articles() {
    return this.results;
  }

  ngOnInit(): void {
    this.apiService.getArticles()
      .subscribe(result => {
        if(result){
          this.videoArticleHighlights(result)
        }
        this.cdr.markForCheck();
        console.log("video article highlight",this.videoArticleHighlight);
        console.log("final article array",this.results);
      });
  }

   videoArticleHighlights(results:Article[]):void{
    let videoArticle : VideoArticle[]= results.filter(res =>res.type === "VIDEO") as VideoArticle [];
    this.videoArticleHighlight = videoArticle.sort((a,b)=> new Date(b.publishedAt).getTime()- new Date(a.publishedAt).getTime())[0];
    
    let index = results.findIndex(article=> article.id === this.videoArticleHighlight.id);
    if (index !== -1) {
      
      results.splice(index, 1);
    }
    this.results = results;
  }

}
