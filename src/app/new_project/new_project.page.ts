import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';

import * as $ from "jquery";
import * as SimpleMDE from 'simplemde';
import * as marked from 'marked';

@Component({
  selector: 'app-new_project',
  templateUrl: 'new_project.page.html',
  styleUrls: ['new_project.page.scss']
})
export class NewProjectPage {
  // fileProject: File = null;
  // fileBackground: File = null;
  file: File = null;
  imgSrcProject: string | ArrayBuffer = "";
  imgSrcBackground: string | ArrayBuffer = "";
  imgSrcPoint: string | ArrayBuffer = "";
  imgSrcTech: string | ArrayBuffer = "";

  projectDetail: string = null;
  simplemde: SimpleMDE;



  constructor(
    private router: Router,
    public gs: GlobalService

  ) { }

  ngOnInit() {
    marked.setOptions({
      sanitize: true,
      sanitizer: escape,
      breaks : true
    });

    this.simplemde = new SimpleMDE({
      element: document.getElementById("editor"),
      toolbar: [
          "bold",
          "italic",
          "strikethrough",
          "heading",
          "code",
          "quote",
          "unordered-list",
          "ordered-list",
          "clean-block",
          "link",
          "image",
          "table",
          "horizontal-rule",
          "preview",
          "side-by-side",
          "fullscreen",
          "guide"
      ],
      spellChecker: false
    });

    this.simplemde.codemirror.on('refresh', () => {
        if (this.simplemde.isFullscreenActive()) {
            $('header').css('display', 'none');
        } else {
            $('header').css('display', 'block');
        }
    });
  }

  toArticle = () => {
    // const md = this.simplemde.value();
    // this.projectDetail = marked(md);
    // $('.project-detail').html(this.projectDetail);
    this.router.navigate(['article']);
  }



  onChangeFileInputProject(event) {
    if (event.target.files.length === 0) {
      this.file = null;
      this.imgSrcProject = "";
      return;
    }
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.onload = () => {
      $("#thumbnails").css('content', 'none');
      this.imgSrcProject = reader.result;
    }
    reader.readAsDataURL(this.file);
  }

  onChangeFileInputBackground(event) {
    if (event.target.files.length === 0) {
      this.file = null;
      this.imgSrcBackground = "";
      return;
    }
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.onload = () => {
      $("#detail_background_img").css('content', 'none');
      this.imgSrcBackground = reader.result;
    }
    reader.readAsDataURL(this.file);
  }

  onChangeFileInputPoint(event) {
    if (event.target.files.length === 0) {
      this.file = null;
      this.imgSrcPoint = "";
      return;
    }
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.onload = () => {
      $("#detail_point_img").css('content', 'none');
      this.imgSrcPoint = reader.result;
    }
    reader.readAsDataURL(this.file);
  }

  onChangeFileInputTech(event) {
    if (event.target.files.length === 0) {
      this.file = null;
      this.imgSrcTech = "";
      return;
    }
    let reader = new FileReader();
    this.file = event.target.files[0];
    reader.onload = () => {
      $("#detail_tech_img").css('content', 'none');
      this.imgSrcTech = reader.result;
    }
    reader.readAsDataURL(this.file);
  }
}
