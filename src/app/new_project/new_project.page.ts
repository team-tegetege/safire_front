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
  url: string = 'https://techfusion-studio.com/safire/'
  postObj: any = {};
  returnObj: any = {};

  file: File = null;
  imgSrcProject: string | ArrayBuffer = "";
  imgSrcBackground: string | ArrayBuffer = "";
  imgSrcPoint: string | ArrayBuffer = "";
  imgSrcTech: string | ArrayBuffer = "";

  projectDetail: string = null;
  simplemde: SimpleMDE;

  imgHeight: number = 600;

  /** 登録する情報 **/
  title: string;
  thumbnail: string;
  description: string;
  user_id: string;
  tag_list: any[] = [];
  description_background: string;
  thumbnail_background: any;
  description_idea: string;
  thumbnail_idea: any;
  description_technology: string;
  thumbnail_technology: any;
  appendix: string;
  color: string;




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


  postProject = () => {
    this.setValues(); //画像以外の登録情報をセットする
    this.postObj['title'] = this.title;
    this.postObj['thumbnail'] = this.thumbnail;
    this.postObj['description'] = this.description;
    this.postObj['user_id'] = this.user_id;
    this.postObj['tag_list'] = this.tag_list;
    this.postObj['description_background'] = this.description_background;
    this.postObj['thumbnail_background'] = this.thumbnail_background;
    this.postObj['description_idea'] = this. description_idea;
    this.postObj['thumbnail_idea'] = this.thumbnail_idea;
    this.postObj['description_technology'] = this.description_technology;
    this.postObj['thumbnail_technology'] = this.thumbnail_technology;
    this.postObj['appendix'] = this.appendix;
    this.postObj['color'] = this.color;
    const body = this.postObj;
    console.log(body)

    this.gs.http(this.url+'project', body).subscribe(
      res => {
        this.returnObj = res;
        console.log(this.returnObj['message']);
        /*if(this.returnObj['message']){
          console.log('Success: Post Project')
          this.router.navigate(['article']);
        }
        else {
          console.log('Error');
          return;
        }*/
      }
    )
  }

  setValues = () => {
    this.title = this.title;
    //thumbnail -> onChangeFileInputProject
    var element: HTMLInputElement = <HTMLInputElement>document.getElementById('project_description');
    this.description = element.value;
    this.user_id = localStorage.user_id;

    const allCheckBoxes = document.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
    allCheckBoxes.forEach(checkBox => {
      if(checkBox && checkBox.checked) {
        console.log('yeah!')
        this.tag_list.push(checkBox.value)
      }
    });

    var element_background: HTMLInputElement = <HTMLInputElement>document.getElementById('background_description');
    this.description_background = element_background.value
    //thumbnail_background -> onChangeFileInputBackground
    var element_idea: HTMLInputElement = <HTMLInputElement>document.getElementById('point_description')
    this.description_idea = element_idea.value;
    //thumbnail_idea -> onChangeFileInputPoint
    var element_technology: HTMLInputElement = <HTMLInputElement>document.getElementById('tech_description')
    this.description_technology = element_technology.value;
    //thumbnail_technology -> onChangeFileInputTechnology
    this.appendix = this.simplemde.value();
    this.color = this.color;
  }

  onChangeFileInputProject(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail = canvas.toDataURL(imgType);
      }
      $("#thumbnails").css('content', 'none');
      this.imgSrcProject = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onChangeFileInputBackground(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail_background = canvas.toDataURL(imgType);
      }
      $("#detail_background_img").css('content', 'none');
      this.imgSrcBackground = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onChangeFileInputPoint(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail_idea = canvas.toDataURL(imgType);
      }
      $("#detail_point_img").css('content', 'none');
      this.imgSrcPoint = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  onChangeFileInputTech(event) {
    var file: any = event.srcElement.files[0];
    var fileReader: any = new FileReader();
    var img = new Image();
    fileReader.onloadend = () => {
      img.onload = () => {
        // 画像軽量化
        console.log('Image Processing');
        const imgType = img.src.substring(5, img.src.indexOf(';'));
        const imgWidth = img.width * (this.imgHeight / img.height);
        const canvas = document.createElement('canvas');
        canvas.width = imgWidth;
        canvas.height = this.imgHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, imgWidth, this.imgHeight);
        this.thumbnail_technology = canvas.toDataURL(imgType);
      }
      $("#detail_tech_img").css('content', 'none');
      this.imgSrcTech = fileReader.result;
      // 画像ファイルを base64 文字列に変換します
      img.src = fileReader.result;
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }
}
