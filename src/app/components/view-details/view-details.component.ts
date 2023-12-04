import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  article!:Article
  arrArticle!:Article[]
  test:string = "";
  constructor(private route:ActivatedRoute,
    private api: ApiService
    ){

  }
  ngOnInit(): void {
   this.api.get('/articles')
   .then((result:Article[])=>{
    
      let article = result.find((value: Article)=>{
      return  value._id === this.articleId
      })
      if(article){
        this.article = article;
        this.arrArticle = [article]
        console.log("ARTICLE",this.article)
      }
   }) 


  }

  private get articleId(){
  return this.route.snapshot.queryParams.id
  }
}
