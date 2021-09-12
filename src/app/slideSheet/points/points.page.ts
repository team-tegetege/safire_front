import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';

// import table from 'src/app/slide.config';

@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  // currentPage: string = 'tech';
  // currentPageIndex: any = table.indexOf(this.currentPage);

  thumbnail: string = JSON.parse(localStorage.abstract)["thumbnail_idea"]
  abstract1: string = JSON.parse(localStorage.abstract)["abstract_list"][1][0]
  abstract2: string = JSON.parse(localStorage.abstract)["abstract_list"][1][1]
  abstract3: string = JSON.parse(localStorage.abstract)["abstract_list"][1][2]
  abstract4: string = JSON.parse(localStorage.abstract)["abstract_list"][1][3]

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
      this.ngOnInit()
      this.toNextPage();
    }
    else if(event.key == 'ArrowLeft'){
      // this.currentPageIndex = table.indexOf(this.currentPage);
      this.ngOnInit()
      this.toPrevPage();
    }
  }
  

  toNextPage = () => {
    this.router.navigate(['/slides', 'tech']);
  }

  toPrevPage = () => {
    this.router.navigate(['/slides', 'project']);
  }
}
