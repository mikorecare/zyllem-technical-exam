import { Component, Input } from '@angular/core';
import { FeaturedAdArticle } from 'src/app/model/article';
import { AbstractArticleComponent } from '../abstract.article.component';

@Component({
  selector: 'app-feature',
  templateUrl: './article.feature.component.html',
})
export class ArticleFeatureComponent extends AbstractArticleComponent {
  @Input() article!: FeaturedAdArticle;
}
