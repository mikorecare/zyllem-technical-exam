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
                  this.route.navigate([routerLink],{queryParams:{id:article._id}})
                );
                
                hostElement.insertAdjacentElement("afterbegin", this.addArticleTitle(article.title));
                componentRef.instance.article = article 
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
