import { Component } from '@angular/core';

@Component({
  selector: 'app-bots',
  templateUrl: './bots.component.html',
  styleUrls: ['./bots.component.scss']
})
export class BotsComponent {
  showBotCard1 = true;
  showBotCard2 = true;
  showBotCard3 = true;

  closeBot1() {
    this.showBotCard1 = false; 
  }
  closeBot2() {
    this.showBotCard2 = false; 
  }
  closeBot3() {
    this.showBotCard3 = false;
  }
}
