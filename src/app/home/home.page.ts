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

  ranking_flag: boolean = false;
  ranking_display: string = "表示する"
  ranking_project: any[] = [{
    img: "/assets/img/view_ranking_1.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_2.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_3.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_other.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  },
  {
    img: "/assets/img/view_ranking_other.png",
    id: 1,
    title: "すごいサービス",
    tag_list: ["AI", "IoT"]
  }]

  img: string;

  recommend_user: any[] = [{
    user_id: "サファ太郎",
    tag_list: ["AI", "IoT"]
  },
  {
    user_id: "サファ太郎",
    tag_list: ["AI", "IoT"]
  },
  {
    user_id: "サファ太郎",
    tag_list: ["AI", "IoT"]
  }]

  login_flag: boolean

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
    this.gs.httpGet(this.url + 'home').subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj)
        if(this.returnObj['project_list']){
          this.project_list = this.returnObj['project_list'];
          this.checkTagListLength(this.project_list)
        }
      }
    )
  }

  // 既存のページに帰ってくる場合はこっち
  ionViewDidEnter() {
    this.checkLogin();
  }

  signup = () => {
    this.router.navigate(['signup']);
  }

  login = () => {
    this.router.navigate(['login']);
  }

  logout = () => {
    localStorage.clear();
    this.checkLogin();
    // this.router.navigate(['']);
  }

  checkLogin = () => {
    this.login_flag = (localStorage.user_id !== undefined)
    console.log(this.login_flag)
  }

  toMypage = () => {
    this.router.navigate(['/userpage'], {queryParams: {user: localStorage.user_id}})
  }

  toNewProject = () => {
    this.router.navigate(['new_project'])
  }

  toUserPage = (user_id) => {
    this.router.navigate(['/userpage'], {queryParams: {user: user_id}});
  }

  toArticlePage = (id: any) => {
    localStorage.project_id = id;
    this.router.navigate(['article']);
  }

  changeRankingDisplay = () => {
    this.ranking_flag = !this.ranking_flag
    if (this.ranking_flag) this.ranking_display = "表示を消す"
    else this.ranking_display = "表示する"
  }

  /** プロジェクトタグが3つ以上の場合はproject-cardに収まらないので3つだけ表示 **/
  checkTagListLength = (projects: any[]) => {
    for(let i in projects){
      var project = projects[i]
      if(project['tag_list'].length > 3){
        this.project_list[i]['tag_list'] = project['tag_list'].splice(0, 3)
        this.project_list[i]['tag_list'].push('+')
      }
    }
  }
}
