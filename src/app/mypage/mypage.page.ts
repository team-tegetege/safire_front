import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-mypage',
  templateUrl: 'mypage.page.html',
  styleUrls: ['mypage.page.scss']
})
export class MypagePage {

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  logout = () => {
    this.router.navigate([''])
  }

}
