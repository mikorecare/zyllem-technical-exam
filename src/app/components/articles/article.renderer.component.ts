import {
    Component, ComponentFactoryResolver, Input,
    OnInit, ViewContainerRef
} from "@angular/core";
import { Article } from "src/app/model/article";
import { articleMapper } from "./article.mapper";

@Component({
    selector: 'article-renderer-component',
    template: ''
})
export class ArticleRendererComponent implements OnInit {

    @Input() articles: Article[];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        for (const article of this.articles) {
            const resolveArticle = articleMapper.get(article.type);

            if (resolveArticle) {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(resolveArticle);
                const componentRef = this.viewContainerRef.createComponent(componentFactory);

                const hostElement = <HTMLElement>componentRef.location.nativeElement;

                hostElement.classList.add('article-item');
                hostElement.insertAdjacentElement("afterbegin", this.addArticleTitle(article.title));

                componentRef.instance.article = article;
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
