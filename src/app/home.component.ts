import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component,
    OnInit
  } from '@angular/core';
  
  import { ZyllemApiService } from "./app.service";
  import { Article, ArticleType, VideoArticle } from './model/article';
  import {Router} from '@angular/router'

@Component({
  selector: 'app-view-details',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    constructor(
        private readonly apiService: ZyllemApiService,
        private readonly cdr: ChangeDetectorRef,
        private router: Router
      ) { }
    
      private results!: Article[];
      private filteredResults!:Article[];
      filter:string = 'All';
      videoArticleHighlight!: VideoArticle;
      test:any = []
    
      get articles() {
        return this.filteredResults;
      }
    
      ngOnInit(): void {
        this.apiService.getArticles()
          .subscribe(result => {
    
            if(result){
              this.videoArticleHighlights(result)
              
            }
            this.cdr.markForCheck()
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
    
    
        this.articleFilter();
      }
    
      logMe(){
        console.log(this.filter);
      }
    
      articleFilter(): void {
        if (this.filter === 'All') {
          this.filteredResults = this.results;
        } else {
          const filteredType: ArticleType = this.filter.toUpperCase() as ArticleType;
          this.filteredResults = this.results.filter(res => res.type === filteredType);
        }
      
        this.cdr.detectChanges();
      }
    
      goto(){
        this.router.navigate(['/details']);
      }
}
