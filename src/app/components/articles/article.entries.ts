import { Injectable, Type } from "@angular/core";
import { ArticleType } from "src/app/model/article";
import { AbstractArticleComponent } from "./abstract.article.component";
import { articleMapper } from "./article.mapper";
import { ArticleFeatureComponent } from "./feature/article.feature.component";
import { ArticleNormalComponent } from "./normal/article.normal.component";
import { ArticleVideoComponent } from "./video/article.video.component";
import { ArticleFeatureAdComponent } from "./feature-ad/article.feature-ad.component";

export const articleEntries: Type<AbstractArticleComponent>[] = [
    ArticleVideoComponent,
    ArticleFeatureComponent,
    ArticleNormalComponent,
    ArticleFeatureAdComponent
];

@Injectable({
    providedIn: 'root',
  })
  export class ArticleRegistrationService {
    registerArticle(articleType: ArticleType, component: Type<AbstractArticleComponent>) {
      if (!articleMapper.has(articleType)) {
        console.log("Sucess, " , component)
        articleMapper.set(articleType, component);
      }
    }
  
    registerDefaultArticles() {
      this.registerArticle(ArticleType.NORMAL, ArticleNormalComponent);
      this.registerArticle(ArticleType.FEATURED, ArticleFeatureComponent);
      this.registerArticle(ArticleType.VIDEO, ArticleVideoComponent);
      this.registerArticle(ArticleType.FEATURED_AD, ArticleFeatureAdComponent);
    }
  }