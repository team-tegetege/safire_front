import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  constructor(
    private router: Router,
  public gs: GlobalService

  ) { }

  ngOnInit() {
  }

  toPresentation = () => {
    this.router.navigate(['/slides']);
  }

}
