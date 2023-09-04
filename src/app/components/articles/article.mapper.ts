import { Type } from "@angular/core";
import { ArticleType } from "src/app/model/article";
import { ArticleNormalComponent } from "./normal";

export const articleMapper = new Map<ArticleType, Type<ArticleNormalComponent>>();
