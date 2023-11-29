import {
    Component, ComponentFactoryResolver, Input,
    OnChanges,
    OnInit, ViewContainerRef
} from "@angular/core";
import { Article, FeaturedAdArticle, FeaturedArticle, NormalArticle, VideoArticle } from "src/app/model/article";
import { articleMapper } from "./article.mapper";

import { ArticleRegistrationService } from "./article.entries";
@Component({
    selector: 'article-renderer-component',
    template: ''
})
export class ArticleRendererComponent implements OnChanges {

    @Input() articles!: Article[];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private regService: ArticleRegistrationService
    ) { }

    ngOnChanges() {
        this.regService.registerDefaultArticles();
        for (const article of this.articles) {
            const resolveArticle = articleMapper.get(article.type);
           
            if (resolveArticle) {
                console.log("resolved article",article.title)
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(resolveArticle);
                // console.log(componentFactory)
                const componentRef = this.viewContainerRef.createComponent(componentFactory);

                const hostElement = <HTMLElement>componentRef.location.nativeElement;

                hostElement.classList.add('article-item');
                hostElement.insertAdjacentElement("afterbegin", this.addArticleTitle(article.title));

                switch (article.type) {
                    case "FEATURED_AD":
                      if ('adBannerUrl' in article) {
                        componentRef.instance.article = article as FeaturedAdArticle;
                      }
                      break;
                    case "FEATURED":
                      if ('featureImgUrl' in article) {
                        componentRef.instance.article = article as FeaturedArticle;
                      }
                      break;
                    case "VIDEO":
                      if ('videoUrl' in article) {
                        componentRef.instance.article = article as VideoArticle;
                      }
                      break;
                    case "NORMAL":
                        if ('description' in article) {
                          componentRef.instance.article = article as NormalArticle;
                        }
                    break;
           
                  }
                componentRef.changeDetectorRef.detectChanges();
            } else {
                console.warn(`component not implemented yet for this type ${article.type}.`);
            }
        }
    }

    private addArticleTitle(title: string) {
        const heading = document.createElement('h2');
        heading.classList.add('article-title');
        heading.innerText = title;
        heading.title = title;
        return heading;
    }

}
