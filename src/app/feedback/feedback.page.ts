import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalService } from '../global.service';
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import axios from 'axios';
import Cookie from 'universal-cookie';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

  text: string = ""
  status: string = "しゃべった内容をここで確認！"

  speechFlag: boolean = true

  return: any = {}

  video: HTMLVideoElement
  video_flag: boolean = false
  video_text: string = "カメラ起動"
  stream: any
  video_button_fill: string = "solid"

  constructor(
    private router: Router,
    public gs: GlobalService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // this.getTokenOrRefresh()
    this.route.params.subscribe(
      params => {
        this.gs.httpGet("https://techfusion-studio.com/safire/presentation/" + params["project_id"]).subscribe(
          res => {
            this.return = res
            console.log(res)
          }
        )
      }
    )
  }

  startSpeech = () => {
    this.speechFlag = true
    this.sttFromMic()
  }
  stopSpeech = () => {
    this.speechFlag = false
  }

  countFiller = () => {
    console.log(this.text)
  }

  async sttFromMic() {
    const tokenObj = await this.getTokenOrRefresh();
    const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    speechConfig.speechRecognitionLanguage = 'ja-JP';
    
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    this.status = "speak into your microphone..."

    recognizer.recognizeOnceAsync(result => {
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
            this.text = this.text + `${result.text}`
            if (this.speechFlag == true) {
              this.sttFromMic()
            }
            else {
              this.text = this.text + "[END]"
            }
        } else {
          this.text = this.text + "[END]"
        }
    });
  }

  async getTokenOrRefresh() {
    const cookie = new Cookie();
    const speechToken = cookie.get('speech-token');
    const region = "japaneast"
    const headers = {
      headers: {
        'Ocp-Apim-Subscription-Key': "c57b312ee02e46e4ba8ac7bd8e9920c8",
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
      
    if (speechToken === undefined ) {
      try {
        const tokenResponse = await axios.post(`https://japaneast.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
        const token = tokenResponse.data
        cookie.set('speech-token', region + ':' + token, {maxAge: 540, path: '/'});

        console.log('Token fetched from back-end: ' + token);
        return { authToken: token, region: region };
      } catch (err) {
        console.log(err);
        return { authToken: null, error: err };
      }
      } else {
        console.log('Token fetched from cookie: ' + speechToken);
        const idx = speechToken.indexOf(':');
        return { authToken: speechToken.slice(idx + 1), region: speechToken.slice(0, idx) };
      }
  }

  changeCamera = () => {
    this.video = document.querySelector("#camera")
    if (this.video_flag) {
      // カメラを<video>と同期
      this.stream.getTracks().forEach(track => track.stop())
      this.video_flag = !this.video_flag
      this.video_text = "カメラ起動"
      this.video_button_fill = "solid"
    }
    else {
      /** カメラ設定 */
      const constraints = {
        audio: false,
        video: {
          width: 300,
          height: 200,
          facingMode: "user"   // フロントカメラを利用する
          // facingMode: { exact: "environment" }  // リアカメラを利用する場合
        }
      }

      // カメラを<video>と同期
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        this.video.srcObject = stream
        this.stream = stream
        this.video.onloadedmetadata = (e) => {
          this.video.play()
          this.video_flag = !this.video_flag
          this.video_text = "カメラ停止"
          this.video_button_fill = "outline"
        };
      })
      .catch( (err) => console.log(err.name + ": " + err.message) );
    }
  }
}
