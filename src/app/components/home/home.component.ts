import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component,
    OnInit
  } from '@angular/core';
  import { ApiService } from '../../services/api.service';
  import { ZyllemApiService } from "../../app.service";
  import { Article, ArticleType, VideoArticle } from '../../model/article';
  import {Router} from '@angular/router'
  import { Global } from '../module/global';
@Component({
  selector: 'app-view-details',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
    constructor(
        // private readonly apiService: ZyllemApiService,
        private readonly cdr: ChangeDetectorRef,
        private router: Router,
        private api:ApiService,
        private global:Global
      ) { }
      
      choices:[ArticleType,string][]=[[ArticleType.VIDEO,"Video"],
      [ArticleType.NORMAL,"Normal"],
      [ArticleType.FEATURED,"Featured"],
      [ArticleType.FEATURED_AD,"Featured Ad"]]
      isLoading:boolean = true;
      private results: Article[] = [];
      private filteredResults!:Article[];
      filter:ArticleType | null = null;
      videoArticleHighlight!: VideoArticle;
      test:any = []
    
      get articles() {
        return this.filteredResults;
      }
    
      ngOnInit(): void {
        this.getArticles()
        // this.apiService.getArticles()
        //   .subscribe(result => {
    
        //     if(result){
        //       this.videoArticleHighlights(result)
              
        //     }
        //     this.cdr.markForCheck()
        //     console.log("video article highlight",this.videoArticleHighlight);
        //     console.log("final article array",this.results);
        //   });
      }

      private async getArticles(){
          // if(this.global.articleList.length > 0){
          //   console.log("GLOBAL ARTICLE",this.global.articleList)
          //   this.results = [...this.global.articleList]
          //   this.videoArticleHighlights(this.results);
          // }
          // else{
            await this.api.get('/articles')
            .then((result:Article[])=>{
              result.sort((a,b)=> new Date(b.publishedAt).getTime()- new Date(a.publishedAt).getTime());
              this.global.articleList = [...result]
              console.log("RESULT:    ",result)
              let isV
              for(const item of result){
                console.log("ITEM", item)
                if(item.type === ArticleType.VIDEO && !this.videoArticleHighlight){
                  this.videoArticleHighlight = item as VideoArticle;
                }
                else{
                  this.results.push(item)
                }
              }
              this.articleFilter()  
            })
            .catch((err)=>{
                console.warn(err)
                this.isLoading = false
            })
          // }
         
        }
    
      private videoArticleHighlights(results:Article[]):void{
        console.log("Video Article Highlights: <BEFORE>", results.length)
        
        // let videoArticle : VideoArticle[]= results.filter(res =>res.type === "VIDEO") as VideoArticle [];

        // this.videoArticleHighlight = videoArticle.sort((a,b)=> new Date(b.publishedAt).getTime()- new Date(a.publishedAt).getTime())[0];
        // let index = results.findIndex(article=> article._id === this.videoArticleHighlight._id);
        // if (index !== -1) {
          
        //   results.splice(index, 1);
        // }  
        // this.results = results;
       this
        this.articleFilter();
      }
    
      logMe(){
        console.log(this.filter);
      }
    
      articleFilter(): void {
        console.log("Filter Triggered")
        if (this.filter === null) {
          this.filteredResults = this.results;
        } else {
          this.filteredResults = this.results.filter(res => res.type === this.filter);
        }
        this.isLoading = false
        this.cdr.detectChanges();
        
      }
    
      goto(){
        this.router.navigate(['/details'],{queryParams:{info:encodeURIComponent(JSON.stringify(this.videoArticleHighlight))}});
      }
}
