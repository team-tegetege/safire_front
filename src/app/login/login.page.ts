import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user_id: string;
  password: string;
  postObj: any[] = [];
  returnObj: any[] = [];
  loginUrl: string = '';

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  login = () => {
    /*this.postObj['user_id'] = this.user_id;
    this.postObj['password'] = this.password;
    const body = this.postObj;
    this.gs.http(this.loginUrl, body).subscribe(
      res => {
        this.returnObj = res;
        if(this.returnObj['status'] == 200){
          this.router.navigate(['/tabs', 'tab1']);
        }
      }
    )*/
    
    alert('ログイン処理');
    // this.router.navigate(['/tabs', 'userhome']);
    this.router.navigate(['userhome'])
  }
}
