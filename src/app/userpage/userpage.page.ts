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

  user_id: string = "hoge";
  description: string = "こんにちは";

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
    this.gs.http(this.url+'mypage/'+this.user_id, body).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['message']){
          console.log('Success Get User Info');
          this.description = this.returnObj['desxription'];
          //プロジェクト一覧
        }
        else{
          console.log('Error');
          return;
        }
      }
    )
  }

  logout = () => {
    this.router.navigate([''])
  }

}
