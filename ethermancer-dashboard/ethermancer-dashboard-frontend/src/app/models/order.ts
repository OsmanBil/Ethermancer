export class Order {
  id?: number;
  totalAmount: number;
  fullName: string;
  address: string;
  creditCardNum: string;

  constructor() {
    this.id = 1;
    this.totalAmount = 0;
    this.fullName = '';
    this.address = '';
    this.creditCardNum = '';
  }
}
