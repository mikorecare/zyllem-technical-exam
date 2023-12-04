import { Injectable } from "@angular/core";
import { Article } from "src/app/model/article";


@Injectable()
export class Global {
    articleList:Article[] = [];

    async getArticleList(api: any) {
        this.articleList = await api.then((res: any) => res.data).catch(() => []);
        return this.articleList;
      }
}