import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};
  project_list: any;

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
    this.gs.httpGet(this.url+'home').subscribe(
      res => {
        this.returnObj = res;
        this.project_list = this.returnObj['project_list'];
      }
    )
  }

  signup = () => {
    this.router.navigate(['signup']);
  }

  login = () => {
    this.router.navigate(['login']);
  }

  toUserPage = () => {
    this.router.navigate(['userpage']);
  }

  toArticlePage = (id: any) => {
    localStorage.project_id = id;
    this.router.navigate(['article']);
  }
}
