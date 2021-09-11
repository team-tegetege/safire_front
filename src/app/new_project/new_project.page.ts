import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import { LoadingController } from '@ionic/angular';

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

  /** 登録する情報 **/
  title: string;
  thumbnail: string;
  description: string;
  user_id: string;
  tag_list: string[] = [];
  description_background: string;
  thumbnail_background: string;
  description_idea: string;
  //thumbnail_idea

  interval: any
  loading: any

  constructor(
    private router: Router,
    public gs: GlobalService,
    public loadingController: LoadingController
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
    const checkBoxes = document.getElementsByName('progLang');
    const checkedArray = (checkboxes: NodeList): HTMLElement[] => {
      let resultArray: HTMLElement[] = Array.prototype.slice.call(checkboxes).filter(checkbox => checkbox.checked)
  
      return resultArray
    }
    console.log(checkedArray(checkBoxes))
    
    //this.router.navigate(['article']);
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

  async getKeyPhrase() {
    /*
    const key = '06adf4e018174acca54b1d98b5a633e9';
    const endpoint = 'https://safire.cognitiveservices.azure.com/';

    const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

    const keyPhrasesInput = [
      "1. とにかく無駄に楽しく安全な一人運転を実現．てれ助手席の「話し相手」✕「前方確認」でもう漫然運転はさせません．  2. 基本的に音声ありの顔出し無し．気軽に始められるスマホアプリ．  3. 運転中につき，携帯を触る機会を減らすオートログイン機能やワンタッチ操作実装．",
      "ja"
    ];
    const keyPhraseResult = await textAnalyticsClient.extractKeyPhrases(keyPhrasesInput);
    console.log(keyPhraseResult)
    */
    /*
    keyPhraseResult.forEach(document => {
        console.log(`ID: ${document.id}`);
        console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
    });*/
    const body = {
      "analysisInput": {
        "documents": [
          {
            "language": "ja",
            "id": "1",  // project_id
            "text": "チームの2人は熊本と鹿児島の出身． 車社会であったこともあり一人運転の『眠気』や『辛さ』に着目． 乗車人数が1人の割合は平日73.8%，休日52.9%． 正直しんどい人も多いのでは？ 一人運転の『つまらなさ』やそれに伴う『漫然運転』といった問題を解決するサービスを開発したい!!"  // description
          }
        ]
      },
      "tasks": {
        "extractiveSummarizationTasks": [
          {
            "parameters": {
              "model-version": "latest",
              "sentenceCount": 4,
              "sortBy": "Offset"
            }
          }
        ]
      }
    }
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 120000
    });
    await this.loading.present();
    this.gs.httpAbst('https://safire.cognitiveservices.azure.com/text/analytics/v3.2-preview.1/analyze', body).subscribe(
      res => {
        console.log(res.headers.get('operation-location'))
        this.interval = setInterval(() => {
          this.gs.httpGetAbst(res.headers.get('operation-location')).subscribe(
            res => {
              // listの中の'text'を採用する
              if (res["status"] == "succeeded") {
                console.log(res["tasks"]["extractiveSummarizationTasks"][0]["results"]["documents"][0]["sentences"])
                this.loading.dismiss()
                clearInterval(this.interval)
              }
            }
          )
        }, 1000)
      }
    )
  }
}
