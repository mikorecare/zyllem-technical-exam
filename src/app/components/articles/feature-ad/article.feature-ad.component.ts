import { Component, Input } from '@angular/core';
import { FeaturedAdArticle } from 'src/app/model/article';
import { AbstractArticleComponent } from '../abstract.article.component';

@Component({
  selector: 'app-feature-ad',
  templateUrl: './article.feature-ad.component.html',
})
export class ArticleFeatureAdComponent extends AbstractArticleComponent {
  @Input() article!: FeaturedAdArticle;
}
