import { Type } from "@angular/core";
import { ArticleType } from "src/app/model/article";
import { ArticleNormalComponent } from "./normal";
import { AbstractArticleComponent } from "./abstract.article.component";

export const articleMapper = new Map<ArticleType, Type<AbstractArticleComponent>>();
