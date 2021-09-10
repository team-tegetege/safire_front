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

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {}

  ngOnInit(){
    this.getHomeInfo();
  }

  getHomeInfo = () => {
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
