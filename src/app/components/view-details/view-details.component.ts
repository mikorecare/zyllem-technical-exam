import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/model/article';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {
  article!:Article
  constructor(private route:ActivatedRoute){

  }
  ngOnInit(): void {
   this.article = JSON.parse(decodeURIComponent(this.route.snapshot.queryParams.info))
  }
}
