import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.page.html',
  styleUrls: ['./rate-modal.page.scss'],
})
export class RateModalPage implements OnInit {
  @Input() project_id: number
  @Input() user_id: string

  rate: number = 3.0

  constructor(
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss = () => {
    this.modalController.dismiss({"dissmiss": true})
  }

}
