import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { articleEntries } from "./article.entries";
import { ArticleRendererComponent } from "./article.renderer.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...articleEntries,
        ArticleRendererComponent
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
