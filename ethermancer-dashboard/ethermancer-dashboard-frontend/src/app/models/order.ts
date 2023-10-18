export class Order {
  totalAmount: number;
  fullName: string;
  address: string;
  creditCardNum: string;

  constructor() {
    this.totalAmount = 0;
    this.fullName = '';
    this.address = '';
    this.creditCardNum = '';
  }
}
