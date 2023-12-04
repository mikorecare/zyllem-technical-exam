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
      
      isLoading:boolean = true;
      private results!: Article[];
      private filteredResults!:Article[];
      filter:string = 'All';
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

       async getArticles(){
          if(this.global.articleList.length > 0){
            console.log("GLOBAL ARTICLE",this.global.articleList)
            this.results = [...this.global.articleList]
            this.videoArticleHighlights(this.results);
          }
          else{
            await this.api.get('/articles')
            .then((result:Article[])=>{
              this.global.articleList = [...result]
                console.log("RESULT:    ",result)
                if(result){
                    
                    this.videoArticleHighlights(result)  
                  }
            })
            .catch((err)=>{
                console.warn(err)
                this.isLoading = false
            })
          }
         
        }
    
       videoArticleHighlights(results:Article[]):void{
        console.log("Video Article Highlights: <BEFORE>", results.length)
        let videoArticle : VideoArticle[]= results.filter(res =>res.type === "VIDEO") as VideoArticle [];
        this.videoArticleHighlight = videoArticle.sort((a,b)=> new Date(b.publishedAt).getTime()- new Date(a.publishedAt).getTime())[0];
        
        let index = results.findIndex(article=> article._id === this.videoArticleHighlight._id);
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
        console.log("Filter Triggered")
        if (this.filter === 'All') {
          this.filteredResults = this.results;
        } else {
          const filteredType: ArticleType = this.filter.toUpperCase() as ArticleType;
          this.filteredResults = this.results.filter(res => res.type === filteredType);
        }
        this.isLoading = false
        this.cdr.detectChanges();
        
      }
    
      goto(){
        this.router.navigate(['/details'],{queryParams:{info:encodeURIComponent(JSON.stringify(this.videoArticleHighlight))}});
      }
}
