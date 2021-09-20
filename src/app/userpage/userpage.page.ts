import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-userpage',
  templateUrl: 'userpage.page.html',
  styleUrls: ['userpage.page.scss']
})
export class UserpagePage {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};
  own_project_list: any[];

  user_id: string = "hoge";
  description: string = "こんにちは";
  image: string;

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit(){
    console.log('ngOnInit at UserPage');
    this.getUserInfo()
  }

  getUserInfo = () => {
    this.user_id = localStorage.user_id;
    const body = {}//this.postObj;
    this.gs.httpGet(this.url+'mypage/'+this.user_id).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['message']){
          this.own_project_list = this.returnObj['own_project_list'];
          //this.image = this.['thumbnail'];
          console.log(this.image);
          console.log('Success Get User Info');
          this.description = this.returnObj['description'];
          //プロジェクト一覧
        }
        else{
          console.log('Error');
          return;
        }
      }
    )
  }

  toArticlePage = (id: any) => {
    localStorage.project_id = id;
    this.router.navigate(['article']);
  }

  toUserHome = () => {
    this.router.navigate(['home']);
  }

  logout = () => {
    this.router.navigate([''])
  }

}
