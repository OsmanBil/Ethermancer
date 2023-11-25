import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-key-features',
  templateUrl: './key-features.component.html',
  styleUrls: ['./key-features.component.scss'],
})
export class KeyFeaturesComponent implements OnInit {

  ngOnInit() {
    AOS.init();
  }
}
