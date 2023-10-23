import { Component, OnInit } from '@angular/core';
import { Faq } from '../../models/faq';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      const response = await fetch('../../../assets/datas/faq.json');
     // console.log('Status:', response.status, response.statusText); 
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}, statusText: ${response.statusText}`,
        );
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      this.faqs = await response.json();
    } catch (error: unknown) {
      console.error('There was a problem:', error);
    }
  }

  toggleAnswer(id: number): void {
    const faq = this.faqs.find((f) => f.id === id);
    if (faq) {
      faq.showAnswer = !faq.showAnswer;
    }
  }
}
