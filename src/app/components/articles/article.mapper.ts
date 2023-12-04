import { Type } from "@angular/core";
import { ArticleType } from "src/app/model/article";
import { AbstractArticleComponent } from "./abstract.article.component";

export const articleMapper = new Map<ArticleType, Type<AbstractArticleComponent>>();
