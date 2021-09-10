import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-userpage',
  templateUrl: 'userpage.page.html',
  styleUrls: ['userpage.page.scss']
})
export class UserpagePage {

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  logout = () => {
    this.router.navigate([''])
  }

}
