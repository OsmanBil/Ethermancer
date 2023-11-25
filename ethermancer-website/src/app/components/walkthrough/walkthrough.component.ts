import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.component.html',
  styleUrls: ['./walkthrough.component.scss'],
})
export class WalkthroughComponent implements OnInit {
  ngOnInit() {
    AOS.init();
  }
}
