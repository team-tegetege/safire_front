import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

import * as $ from 'jquery'
import marked from 'marked'


@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  title: string;
  thumbnail: string;
  description: string;
  user_id: string;
  tag_list: any[] = [];
  description_background: string;
  thumbnail_background: any;
  description_idea: string;
  thumbnail_idea: any;
  description_technology: string;
  thumbnail_technology: any;
  appendix: string;
  color: string;


  constructor(
    private router: Router,
  public gs: GlobalService

  ) { }

  ngOnInit() {
    /*this.gs.httpGet(this.url+'project/'+localStorage.project_id).subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj['message']);
        if(this.returnObj['message']){
          console.log('Success: Get Project Detail Info')
          this.setInfo(this.returnObj);
        }
        else {
          console.log('Error');
          return;
        }
      }
    )*/
  }

  setInfo = (res) => {
    this.title = res['title']
    this.thumbnail = res['tumbnail']
    this.description = res['description']
    this.user_id = res['user_id']
    this.tag_list = res['tag_list']
    this.description_background = res['description_background']
    this.thumbnail_background = res['thumbnail_background']
    this.description_idea = res['description_idea']
    this.thumbnail_idea = res['thumbnail_idea']
    this.description_technology = res['description_technology']
    this.thumbnail_technology = res['thumbnail_technology']
    this.appendix = res['appendix']
    this.color = res['color']

    $('#note').html(marked(this.appendix));
  }

  toPresentation = () => {
    //
    this.router.navigate(['/slides']);
  }

  toTraining = () => {

  }

}
