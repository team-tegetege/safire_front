import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
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

  toArticlePage = () => {
    this.router.navigate(['article']);
  }
}
