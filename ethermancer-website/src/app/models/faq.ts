export class Faq {
  id: number;
  question: string;
  answer: string;
  showAnswer: boolean;

  constructor() {
    this.id = 1;
    this.question = '';
    this.answer = '';
    this.showAnswer = false;
  }
}
