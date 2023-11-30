import {
    Component, ComponentFactoryResolver, Input,
    OnChanges,
    OnInit, SimpleChanges, ViewContainerRef
} from "@angular/core";
import { Article, FeaturedAdArticle, FeaturedArticle, NormalArticle, VideoArticle } from "src/app/model/article";
import { articleMapper } from "./article.mapper";
import { ArticleRegistrationService } from "./article.entries";
import {Router} from '@angular/router'
@Component({
    selector: 'article-renderer-component',
    template: ''
})
export class ArticleRendererComponent implements OnChanges {

    @Input() articles!: Article[];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private regService: ArticleRegistrationService,
        private route : Router
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('Articles changed:', this.articles);
        if ('articles' in changes) {
            this.clearViewContainer();
            this.regService.registerDefaultArticles();
            this.renderArticles();
        }
    }

    private renderArticles(): void {
        for (const article of this.articles) {
            const resolveArticle = articleMapper.get(article.type);
           
            if (resolveArticle) {
                console.log("resolved article",article)
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(resolveArticle);
                // console.log(componentFactory)
                const componentRef = this.viewContainerRef.createComponent(componentFactory);

                const hostElement = <HTMLElement>componentRef.location.nativeElement;
                const routerLink = `/details`;
                hostElement.classList.add('article-item');
                hostElement.addEventListener('click', () => 
                  this.route.navigate([routerLink],{queryParams:{info:encodeURIComponent(JSON.stringify(article))}})
                );
                
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
    
    private clearViewContainer() {
        this.viewContainerRef.clear();
      }

}
