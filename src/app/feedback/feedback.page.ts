import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private router: Router,
    public gs: GlobalService

  ) { }

  ngOnInit() {
    // this.getTokenOrRefresh()
    this.gs.httpGet("https://techfusion-studio.com/safire/presentation/11").subscribe(
      res => {
        this.return = res
        console.log(res)
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
}
