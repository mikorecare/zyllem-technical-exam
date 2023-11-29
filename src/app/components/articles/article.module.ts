import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { articleEntries } from "./article.entries";
import { ArticleRendererComponent } from "./article.renderer.component";
import { FeatureComponent } from './feature/feature.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...articleEntries,
        ArticleRendererComponent,
        FeatureComponent
    ],
    entryComponents: [
        ...articleEntries
    ],
    exports: [
        ArticleRendererComponent,
        ...articleEntries
    ]
})
export class ArticleModule { }
