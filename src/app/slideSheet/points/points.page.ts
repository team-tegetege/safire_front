import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

import table from 'src/app/slide.config';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  currentPage: string = 'tech';
  currentPageIndex: any = table.indexOf(this.currentPage);

  constructor(
    private router: Router,
    public gs: GlobalService
  ) { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    this.ngOnInit();
    if(event.key == 'Enter' || event.key == 'ArrowRight'){
      // this.currentPageIndex = table.indexOf(this.currentPage);
      this.toNextPage();
    }
    else if(event.key == 'ArrowLeft'){
      // this.currentPageIndex = table.indexOf(this.currentPage);
      this.toPrevPage();
    }
  }
  

  toNextPage = () => {
    if(this.currentPageIndex <= table.length) {
      this.router.navigate(['./slides', table[this.currentPageIndex+1]]);
      this.currentPageIndex = table.indexOf(this.currentPage);
    }
  }

  toPrevPage = () => {
    if(this.currentPageIndex > 0) {
      this.router.navigate(['./slides', table[this.currentPageIndex-1]]);
      this.currentPageIndex = table.indexOf(this.currentPage);
    }
  }
}
