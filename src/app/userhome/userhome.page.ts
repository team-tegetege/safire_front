import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-userhome',
  templateUrl: 'userhome.page.html',
  styleUrls: ['userhome.page.scss']
})
export class UserHomePage {
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  project_list: any[];
  img: string;

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {}

  ngOnInit(){
    this.gs.httpGet(this.url + 'home').subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj)
        if(this.returnObj['project_list']){
          this.project_list = this.returnObj['project_list'];
        }
      }
    )
  }

  logout = () => {
    this.router.navigate(['']);
  }

  toMypage = () => {
    this.router.navigate(['userpage'])
  }

  toNewProject = () => {
    this.router.navigate(['new_project'])
  }

  toUserPage = () => {
    this.router.navigate(['userpage']);
  }

  toArticlePage = () => {
    this.router.navigate(['article']);
  }
}
