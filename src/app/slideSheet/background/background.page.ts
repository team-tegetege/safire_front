import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

// import table from 'src/app/slide.config';
@Component({
  selector: 'app-background',
  templateUrl: './background.page.html',
  styleUrls: ['./background.page.scss'],
})
export class BackgroundPage implements OnInit {
  // currentPage: string = 'background';
  // currentPageIndex: any = table.indexOf(this.currentPage);

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
      this.toNextPage();
    }
    else if(event.key == 'ArrowLeft'){
      this.toPrevPage();
    }
  }
  

  toNextPage = () => {
    this.router.navigate(['/slides', 'project']);
  }

  toPrevPage = () => {
    this.router.navigate(['/slides', 'title']);
  }
}
