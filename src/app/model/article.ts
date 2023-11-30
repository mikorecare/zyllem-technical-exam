
export abstract class Article {
    _id!: string;
    title!: string;
    author!: string;
    publishedAt!: string; //date time in ISO format 
    url!: string;
    type!: ArticleType;
}

export class NormalArticle extends Article {
    description!: string;
}

export class FeaturedArticle extends  Article{
    featureImgUrl!: string;
}

export class VideoArticle extends  Article{
    videoUrl!: string;
}

export class FeaturedAdArticle extends  Article{
    adBannerUrl!: string;
}

export enum ArticleType {
    NORMAL = "NORMAL",
    FEATURED = "FEATURED",
    VIDEO = "VIDEO",
    FEATURED_AD = "FEATURED_AD"
}