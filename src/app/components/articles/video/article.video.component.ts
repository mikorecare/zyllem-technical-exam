import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { Article, VideoArticle } from "src/app/model/article";
import { AbstractArticleComponent } from "../abstract.article.component";

@Component({
    selector: 'article-video-component',
    templateUrl: './article.video.component.html',
    styleUrls: ['./article.video.component.scss']
})
export class ArticleVideoComponent extends AbstractArticleComponent {

    @Input() article!: VideoArticle;

    get safeVideoUrl() {
        return this.domSanitize.bypassSecurityTrustResourceUrl(this.article.videoUrl);
    }

    constructor(
        private readonly domSanitize: DomSanitizer
    ) {
        super();
    }
}
