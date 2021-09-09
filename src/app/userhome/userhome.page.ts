import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-userhome',
  templateUrl: 'userhome.page.html',
  styleUrls: ['userhome.page.scss']
})
export class UserHomePage {

  constructor(
    private router: Router,
    public gs: GlobalService
  ) {}

  logout = () => {
    this.router.navigate(['']);
  }

  toMypage = () => {
    // this.router.navigate(['/tabs', 'mypage']);
    this.router.navigate(['mypage'])
  }

  toNewProject = () => {
    // this.router.navigate(['/tabs', 'new_project']);
    this.router.navigate(['new_project'])
  }
}
