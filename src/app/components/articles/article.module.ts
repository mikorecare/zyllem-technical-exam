import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { articleEntries } from "./article.entries";
import { ArticleRendererComponent } from "./article.renderer.component";
import { RouterModule } from "@angular/router";
import { ViewDetailsComponent } from "../view-details/view-details.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'details', component: ViewDetailsComponent },
          ]),
    ],
    declarations: [
        ...articleEntries,
        ArticleRendererComponent,
        
    ],
    exports: [
        ArticleRendererComponent,
        ...articleEntries
    ]
})
export class ArticleModule { }
